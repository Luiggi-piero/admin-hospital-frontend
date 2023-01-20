import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UsuarioService } from 'src/app/services/usuario.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [],
})
export class PerfilComponent implements OnInit {
  public usuario: Usuario;
  public perfilForm: FormGroup;
  public imagenSubir: File;
  public imgTemp: any = null;


  constructor(private usuarioService: UsuarioService, private fileUploadService: FileUploadService) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = new FormGroup({
      nombre: new FormControl(this.usuario.nombre, Validators.required),
      email: new FormControl(this.usuario.email, [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  actualizarPerfil() {
    this.usuarioService
      .actualizarPerfil(this.perfilForm.value)
      .subscribe({
        next: (resp) => {
          const {nombre, email} = this.perfilForm.value;
          this.usuario.nombre = nombre;
          this.usuario.email = email;
  
          Swal.fire('Nuevo cambio', 'Perfil actualizado', 'success')
        },
        error: (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        }
      });
  }


  // change del input tipo file
  cambiarImagen(file: File){
    this.imagenSubir = file;

    if(!file) {
      return this.imgTemp = null;
    };

    const reader = new FileReader();
    reader.readAsDataURL(file);


    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  subirImagen(){
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
      .then( img => {
        this.usuario.img = img;
        Swal.fire('Nuevo cambio', 'Imagen actualizada', 'success');
      })
      .catch( (err) => {
        console.log(err);
        Swal.fire('Error', 'No se logró cargar la imagen', 'error');
      })
  }
}
