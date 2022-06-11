import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validators } from '@angular/forms';

@Directive({
  selector: '[appUserformValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: UserformValidatorDirective, multi: true }]
})
export class UserformValidatorDirective implements Validators{

  constructor() { }
  validate(control: AbstractControl){
    if (control.value) {
      if (control.value.length >20) {
          return{fullnameLengthError: true}
      }
     else{return null}
    }
  }

}
