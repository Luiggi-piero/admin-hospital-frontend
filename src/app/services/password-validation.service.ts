import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PasswordValidationService {

  constructor() { }

  validarSonIguales: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const pass1 = control.get('password');
    const pass2 = control.get('password2');

    if(pass1?.value !== pass2?.value){
      pass2?.setErrors({noEsIgual: true})
    }

    return pass1?.value === pass2?.value ? null : { 'contrasenasDistintas': true };
  }
}
