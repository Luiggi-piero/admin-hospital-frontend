import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

import { UsuarioService } from 'src/app/services/usuario.service';
import { PasswordValidationService } from '../../services/password-validation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public formSubmitted = false;

  public registerForm: FormGroup = new FormGroup(
    {
      nombre: new FormControl('prueba', [
        Validators.required,
        Validators.minLength(2),
      ]),
      email: new FormControl('prueba@gmail.com', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('123456', Validators.required),
      password2: new FormControl('123456', Validators.required),
      terminos: new FormControl(true, Validators.required),
    },
    {
      validators: this.passwordValidation.validarSonIguales,
    }
  );

  constructor(
    private passwordValidation: PasswordValidationService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  crearUsuario() {
    this.formSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.usuarioService.crearUsuario(this.registerForm.value).subscribe({
      next: (res) => {
        // console.log('usuario creado', res);
        this.router.navigate(['/']);
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error')
      },
    });
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos(): boolean {
    return !this.registerForm.get('terminos')!.value && this.formSubmitted;
  }

  // Mostrar el mesaje de error
  contrasenasNoValidas(): boolean {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  // Validación personalizada sobre el formulario (forma anterior)
  // passwordsIguales(pass1: string, pass2: string){
  //   // formGroup -> formulario sobre el cual se validará
  //   return (formGroup: FormGroup) => {
  //     const pass1Control = formGroup.get(pass1);
  //     const pass2Control = formGroup.get(pass2);

  //     if(pass1Control?.value === pass2Control?.value){
  //       pass2Control?.setErrors(null);
  //     }else{
  //       pass2Control?.setErrors({ noEsIgual: true})
  //     }
  //   }
  // }
}
