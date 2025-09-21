import { OrderService } from './../../services/order-service';
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
import { CartService } from '../../services/cart-service';
import { CheckoutItem } from '../../components/checkout-item/checkout-item';
import { IOrder } from '../../models/iorder';

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
    CheckoutItem,
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
  providers: [provideNgxMask()],
})
export class Checkout implements OnInit {
  shippingForm!: FormGroup;
  cartService = inject(CartService);
  orderService = inject(OrderService);
  spinner = inject(NgxSpinnerService);
  toastr = inject(ToastrService);
  router = inject(Router);
  errorMessage: string = '';

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
      cardName: [
        '',
        Validators.required,
        Validators.pattern("^[A-Za-z]{2,}(?:[\\s'][A-Za-z]{1,}(?:-[A-Za-z]{1,})*)+$"),
      ],
      expiryMonth: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      expiryYear: ['', [Validators.required, Validators.min(25), Validators.max(99)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
    });
  }

  states = [
    { name: 'Cairo', code: 'CA' },
    { name: 'Alex', code: 'AL' },
    { name: 'Aswan', code: 'AS' },
    { name: 'Menofia', code: 'ME' },
  ];

  isInvalid(control: string) {
    return (
      this.shippingForm.get(control)?.invalid &&
      (this.shippingForm.get(control)?.dirty || this.shippingForm.get(control)?.touched)
    );
  }
  onSubmit() {
    // this.spinner.show();

    const order: IOrder = {
      ...this.shippingForm.value,
      items: this.cartService.get().map((it) => {
        return {
          productId: it.product.id,
          qty: it.qty,
        };
      }),
    };
    this.orderService.createOrder(order).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.errorMessage = '';

          this.toastr.success(res.message, 'Order Created');
          // console.log('Order Data:', res.data);
          this.orderService.setOrderData(res);

          this.cartService.removeCurrentCart();
          this.router.navigate(['/order-confirmation']);
        } else {
          this.errorMessage = res.message;
        }

        // this.spinner.hide();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Something went wrong';
        // this.spinner.hide();
      },
      complete: () => {
        // this.spinner.hide();
      },
    });
  }
}
