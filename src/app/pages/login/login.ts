import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';

import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    PasswordModule,
    DividerModule,
    FloatLabelModule,
    InputTextModule,
    MessageModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  formLogin!: FormGroup;
  spinner = inject(NgxSpinnerService);
  errorMessage: string = '';
  toastr = inject(ToastrService);
  router = inject(Router);
  private authService = inject(AuthService);
  fb = inject(FormBuilder);
  ngOnInit(): void {
    this.formLogin = this.fb.group({
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
      password: ['', [Validators.required]],
    });
  }
  onSubmit() {
    this.spinner.show();

    this.authService.login(this.formLogin.value).subscribe({
      next: () => {
        this.errorMessage = '';
        this.toastr.success('Welcome back 👋', 'Login Success');
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.spinner.hide();
      },
      complete: this.spinner.hide,
    });
  }
  isInvalid(controlName: string) {
    const control = this.formLogin.get(controlName);
    return control?.invalid && (control.touched || control.dirty);
  }
}
