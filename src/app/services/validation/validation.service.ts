import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ValidationMessages } from '../../shared/const/ValidationMessages';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  static validator(controlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const form = control.get(controlName);
      if (!form?.errors) return null;
      const [error] = Object.keys(form.errors);
      if (error === 'maxlength') {
        return { [controlName]: `${controlName} ${ValidationMessages[error]}` };
      }
      if (error === 'pattern' && controlName === 'price') {
        return { [controlName]: ValidationMessages['price'] };
      }
      return { [controlName]: ValidationMessages[error] };
    };
  }
}
