import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  NgZone,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public formSubmitted = false;

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(localStorage.getItem('email') || 'lucas2@gmail.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('123321', Validators.required),
    remember: new FormControl(this.getRemember()),
  });

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {
    
    google.accounts.id.initialize({
      client_id:
        '904933191644-inv3r28er0j150pbo13m4h38utnamfvh.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response),
    });


    google.accounts.id.renderButton(
      // document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: 'outline', size: 'large' } // customization attributes
    );
  }

  handleCredentialResponse(response: any) {
    // console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle(response.credential).subscribe((res) => {
      this.ngZone.run( () => {
        this.router.navigateByUrl('/');
      })
    });
  }

  login() {
    this.usuarioService.login(this.loginForm.value).subscribe({
      next: (res) => {
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        } else {
          localStorage.removeItem('email');
        }
        this.router.navigate(['/']);
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      },
    });
  }

  getRemember(): boolean {
    return localStorage.getItem('email') ? true : false;
  }
}
