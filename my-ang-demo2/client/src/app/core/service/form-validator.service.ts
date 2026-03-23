import { Injectable } from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {
  constructor() { }

  getFormControlErrorMessage(c: AbstractControl): string {
    if (c == null) {
      return '?';
    }
    if (!(c instanceof FormControl) || !c.errors) {
      return '';
    }
/*    const ctrl = c as FormControl;
    if (ctrl.hasError('required')) {
      return 'Required';
    } else if (ctrl.hasError('email')) {
      return 'Bad email format';
    } else if (ctrl.hasError('minlength')) {
      return 'Minimal length is: ' + ctrl.errors?['minlength']['requiredLength'];
    } else if (ctrl.hasError('maxlength']) {
      return 'Maximal length is: ' + ctrl.errors?['maxlength']?['requiredLength'];
    } else if (ctrl.hasError('min']) {
      return 'Minimal value is: ' + ctrl.errors.min.;
    } else if (ctrl.hasError('max']) {
      return 'Maximal value is: ' + ctrl.errors.max.max;
    } else {
      return 'Unknown error';
    }*/
    return '?????????????';
  }

  getFormErrors(formGroup: FormGroup, errors: any = {}): string[] {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        const errs = control.errors;
        if (errs) {
          errors[field] = errs;
        }
      } else if (control instanceof FormGroup) {
        errors[field] = this.getFormErrors(control);
      }
    });
    return errors;
  }
}
