import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    const errors: ValidationErrors = {};
    if (password == confirmPassword) {
      control.get('confirmPassword')?.setErrors(null);
      return null;
    }
    errors['passwordMismatch'] = 'Passwords do not match';
    control.get('confirmPassword')?.setErrors(errors);
    return errors;
  };
}
