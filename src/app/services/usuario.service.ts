import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;
declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  usuario: Usuario;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }


  googleInit(){
    google.accounts.id.initialize({
      client_id:
        '904933191644-inv3r28er0j150pbo13m4h38utnamfvh.apps.googleusercontent.com',
    });
  }


  get token(): string {
    return localStorage.getItem('token') ?? '';
  }

  crearUsuario(data: RegisterForm) {
    return this.httpClient.post(`${base_url}/usuarios`, data).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  login(data: LoginForm) {
    return this.httpClient.post(`${base_url}/login`, data).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  loginGoogle(token: string) {
    return this.httpClient.post(`${base_url}/login/google`, { token }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  actualizarPerfil(data: { nombre: string; email: string, role: string }) {

    data = {
      ...data,
      role: this.usuario.role
    }

    return this.httpClient.put(`${base_url}/usuarios/${this.usuario.uid}`, data, {
      headers: {
        'x-token': this.token,
      },
    });
  }

  validarToken(): Observable<boolean> {
    // console.log('token en validar token', token);

    return this.httpClient
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((res: any) => {
          const {
            nombre,
            email,
            password,
            img = '',
            google,
            role,
            uid,
          } = res.usuario;

          this.usuario = new Usuario(nombre, email, '', img, google, role, uid);

          localStorage.setItem('token', res.token);
          return true;
        }),
        catchError((error) => of(false))
      );
  }

  logout() {
    localStorage.removeItem('token');

    if (this.usuario.google) {
      google.accounts.id.revoke('luiggiyantas@gmail.com', () => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('/login');
        });
      });
    } else this.router.navigateByUrl('/login');
  }
}
