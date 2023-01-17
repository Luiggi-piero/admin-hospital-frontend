import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

const base_url = environment.base_url;
declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {}

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

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') ?? '';

    // console.log('token en validar token', token);

    return this.httpClient
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token);
        }),
        map((res) => true),
        catchError((error) => of(false))
      );
  }

  logout() {
    localStorage.removeItem('token');

    google.accounts.id.revoke('lviggipiero@gmail.com', () => {
      this.ngZone.run( () => {
        this.router.navigateByUrl('/login');
      })
    });
  }
}
