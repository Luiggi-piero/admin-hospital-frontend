import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
    `
      .has-arrow.waves-effect.waves-dark.active {
        background: transparent;
      }
    `,
  ],
})
export class SidebarComponent implements OnInit {
  usuario: Usuario;

  constructor(
    public sidebarService: SidebarService,
    private usuarioService: UsuarioService
  ) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {}
}
