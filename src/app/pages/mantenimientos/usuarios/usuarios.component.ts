import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;

  public imgSubs: Subscription;

  constructor(
    private usuarioService: UsuarioService,
    private busquedasService: BusquedasService,
    private modalImagenService: ModalImagenService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((resp) => this.cargarUsuarios());
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService
      .cargarUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return (this.usuarios = this.usuariosTemp);
    }

    this.busquedasService.buscar('usuarios', termino).subscribe((resp) => {
      this.usuarios = resp;
    });

    return true;
  }

  borrar(id: string) {
    if (id === this.usuarioService.usuario.uid) {
      Swal.fire('Error', 'No es posible borrarse así mismo', 'error');
      return;
    }

    Swal.fire({
      title: '¿Está seguro de eliminar?',
      text: 'Esta acción es permanente',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#6B728E',
      confirmButtonText: 'Si, borrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(id).subscribe((resp) => {
          this.cargarUsuarios();
          Swal.fire(
            'Usuario borrado',
            'Se actualizó el listado de usuarios',
            'success'
          );
        });
      }
    });
  }

  cambiarRol(user: Usuario) {
    this.usuarioService.guardarUsuario(user).subscribe((resp) => {
      console.log(resp);
    });
  }

  abrirModal(usuario: Usuario) {
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
}
