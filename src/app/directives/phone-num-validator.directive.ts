import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validators } from '@angular/forms';

@Directive({
  selector: '[appPhoneNumValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PhoneNumValidatorDirective, multi: true}]
})
export class PhoneNumValidatorDirective implements Validators{

  constructor() { }
  validate(control: AbstractControl){
    if(control.value){
      if(control.value.length > 11 || control.value == ' '){
        return{phoneNumLengthError: true}
      }
    }
  }

}
