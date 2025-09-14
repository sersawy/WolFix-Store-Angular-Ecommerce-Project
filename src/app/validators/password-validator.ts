import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || '';
    const errors: ValidationErrors = {};
    if (!/[a-z]/.test(value)) {
      errors['lowercase'] = 'Password must contain at least one lowercase letter';
    }

    if (!/[A-Z]/.test(value)) {
      errors['uppercase'] = 'Password must contain at least one uppercase letter';
    }

    if (!/[0-9]/.test(value)) {
      errors['numeric'] = 'Password must contain at least one number';
    }

    if (value.length < 8) {
      errors['minlength'] = 'Password must be at least 8 characters long';
    }
    return Object.keys(errors).length ? errors : null;
  };
}
