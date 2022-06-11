import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validators } from '@angular/forms';

@Directive({
  selector: '[appEmailValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EmailValidatorDirective,  multi: true }]
})
export class EmailValidatorDirective implements Validators{

  constructor() { }
  validate(control: AbstractControl){
    if (control.value) {
        if (control.value.length > 30) {
          return {emaillengthError: true}
        }
    }
  }

}
