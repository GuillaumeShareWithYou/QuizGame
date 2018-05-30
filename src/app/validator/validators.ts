/** A hero's name can't match the given regular expression */
import {AbstractControl, ValidatorFn} from '@angular/forms';

export function mustNotMatchValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {'forbiddenName': {value: control.value}} : null;
  };
}

export function mustMatchValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const matched = nameRe.test(control.value);
    return !matched ? {'wrongPattern': {value: control.value}} : null;
  };
}

export function identicalPasswordValidator(form: AbstractControl): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {

    const passwordCtrl = form.get('password')
    const passwordConfirmCtrl = form.get('passwordConfirm')

    if(passwordCtrl.value !== passwordConfirmCtrl.value){
      passwordConfirmCtrl.setErrors({MatchPassword: false});
      return {MatchPassword: false};
    }
    passwordConfirmCtrl.setErrors(null);
    return null;
  };

}
