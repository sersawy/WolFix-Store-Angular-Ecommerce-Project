import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { AuthService } from '../../services/auth-service';
import { passwordValidator } from '../../validators/password-validator';
import { passwordMatchValidator } from '../../validators/password-match-validator';
import { ToastrService } from 'ngx-toastr';
import { IAccount } from '../../models/iauth-api';

@Component({
  selector: 'app-account-settings',
  imports: [
    ReactiveFormsModule,
    PasswordModule,
    FloatLabelModule,
    InputTextModule,
    MessageModule,
    DividerModule,
    FormsModule,
  ],
  templateUrl: './account-settings.html',
  styleUrl: './account-settings.css',
})
export class AccountSettings implements OnInit {
  formUpdate!: FormGroup;
  formPassword!: FormGroup;
  authService = inject(AuthService);
  accountData: IAccount | null = this.authService.getUserData();
  fb = inject(FormBuilder);
  toastr = inject(ToastrService);

  errorMessageUpdate: string = '';
  errorMessagePassword: string = '';

  ngOnInit(): void {
    this.formUpdate = this.fb.group({
      name: [
        this.accountData?.name,
        [
          Validators.required,
          Validators.pattern("^[A-Za-z]{2,}(?:[\\s'][A-Za-z]{1,}(?:-[A-Za-z]{1,})*)+$"),
        ],
      ],
      email: [
        this.accountData?.email,
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            '^[a-zA-Z0-9._+-]+@(?:[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*\\.)+[a-zA-Z]{2,}$',
          ),
        ],
      ],
    });
    this.formPassword = this.fb.group(
      {
        oldPassword: ['', [Validators.required]],
        password: ['', [Validators.required, passwordValidator()]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: passwordMatchValidator() },
    );
  }
  isInvalid(form: FormGroup, controlName: string) {
    const control = form.get(controlName);
    return control?.invalid && (control.touched || control.dirty);
  }
  onUpdate() {
    this.authService.updateProfile(this.formUpdate.value).subscribe({
      next: () => {
        this.errorMessageUpdate = '';
        this.toastr.success('Profile updated successfully 🎉', 'Update');
      },
      error: (err) => {
        this.errorMessageUpdate = err.error.message;
      },
      complete: () => (this.accountData = this.authService.getUserData()),
    });
  }
  onChangePassword() {
    this.authService.changePassword(this.formPassword.value).subscribe({
      next: () => {
        this.errorMessagePassword = '';
        this.toastr.success('Password changed successfully 🔑', 'Account');
        this.formPassword.reset();
      },
      error: (err) => {
        this.errorMessagePassword = err.error.message;
      },
    });
  }
}
