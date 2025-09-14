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
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sign-up',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    PasswordModule,
    FloatLabelModule,
    InputTextModule,
    MessageModule,
    DividerModule,
    FormsModule,
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp implements OnInit {
  formRegister!: FormGroup;
  authService = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);
  toastr = inject(ToastrService);
  spinner = inject(NgxSpinnerService);
  errorMessage: string = '';
  ngOnInit(): void {
    this.formRegister = this.fb.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.pattern("^[A-Za-z]{2,}(?:[\\s'][A-Za-z]{1,}(?:-[A-Za-z]{1,})*)+$"),
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern(
              '^[a-zA-Z0-9._+-]+@(?:[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*\\.)+[a-zA-Z]{2,}$',
            ),
          ],
        ],
        password: ['', [Validators.required, passwordValidator()]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: passwordMatchValidator() },
    );
  }
  isInvalid(controlName: string) {
    const control = this.formRegister.get(controlName);
    return control?.invalid && (control.touched || control.dirty);
  }
  onSubmit() {
    this.spinner.show();
    this.authService.register(this.formRegister.value).subscribe({
      next: () => {
        this.errorMessage = '';
        this.toastr.success('Account created successfully 🎉', 'Registration');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.spinner.hide();
      },
      complete: this.spinner.hide,
    });
  }
}
