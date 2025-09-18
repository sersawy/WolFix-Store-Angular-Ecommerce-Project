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
import { SelectModule } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CommonModule } from '@angular/common';
import { CardPreview } from '../../components/card-preview/card-preview';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-checkout',
  imports: [
    ReactiveFormsModule,
    PasswordModule,
    FloatLabelModule,
    InputTextModule,
    MessageModule,
    DividerModule,
    FormsModule,
    SelectModule,
    SelectButtonModule,
    CommonModule,
    CardPreview,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
  providers: [provideNgxMask()],
})
export class Checkout implements OnInit {
  shippingForm!: FormGroup;
  fb = inject(FormBuilder);
  ngOnInit(): void {
    this.shippingForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      phone: ['', Validators.required],
      payment: ['credit-card'],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      cardName: ['', Validators.required],
      expiryMonth: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      expiryYear: [
        '',
        [Validators.required, Validators.min(24), Validators.max(99)], // 2-digit year, min 24 = 2024
      ],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
    });
  }

  states = [
    { name: 'Cairo', code: 'CA' },
    { name: 'Alex', code: 'AL' },
    { name: 'Aswan', code: 'AS' },
    { name: 'Menofia', code: 'ME' },
  ];

  paymentMethods = [
    { label: 'Credit Card', value: 'credit-card' },
    { label: 'PayPal', value: 'paypal' },
    { label: 'Apple Pay', value: 'apple-pay' },
  ];

  isInvalid(control: string) {
    return (
      this.shippingForm.get(control)?.invalid &&
      (this.shippingForm.get(control)?.dirty || this.shippingForm.get(control)?.touched)
    );
  }
}
