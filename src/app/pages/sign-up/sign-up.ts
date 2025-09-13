import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { AuthService } from '../../services/auth-service';

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
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp implements OnInit {
  formRegister!: FormGroup;
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  ngOnInit(): void {
    this.formRegister = this.fb.group({
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
            '^[a-zA-Z0-9._+-]+@(?:[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*\\.)+[a-zA-Z]{2,}$'
          ),
        ],
      ],
      password: ['', []],
      confirmPassword: ['', []],
    });
  }
  isInvalid(controlName: string) {
    const control = this.formRegister.get(controlName);
    return control?.invalid && control.touched;
  }
  onSubmit() {
    this.authService.register(this.formRegister.value).subscribe();
  }
}
