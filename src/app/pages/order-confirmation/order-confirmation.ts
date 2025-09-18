import { Component, inject, input, OnInit } from '@angular/core';
import { IOrderRes } from '../../models/iorder';
import { OrderService } from '../../services/order-service';
import { Router } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { BtnPrimary } from '../../components/buttons/btn-primary/btn-primary';
import { BtnSecondary } from '../../components/buttons/btn-secondary/btn-secondary';
import { ProductCard } from '../../components/product-card/product-card';
import { ProductCartCard } from '../../components/product-cart-card/product-cart-card';
import { ICart } from '../../models/iproducts-api';
import { CartService } from '../../services/cart-service';
import { CheckoutItem } from '../../components/checkout-item/checkout-item';

@Component({
  selector: 'app-order-confirmation',
  imports: [DatePipe, CurrencyPipe, BtnPrimary, BtnSecondary, ProductCard, CheckoutItem],
  templateUrl: './order-confirmation.html',
  styleUrl: './order-confirmation.css',
})
export class OrderConfirmation implements OnInit {
  order: IOrderRes = {} as IOrderRes;
  orderService = inject(OrderService);
  cartService = inject(CartService);
  router = inject(Router);
  items: ICart[] = [];
  ngOnInit(): void {
    this.orderService.orderData$.subscribe((order) => {
      if (!this.order.data?.orderId) this.router.navigate(['/']);
      this.order = order;
      this.items = this.cartService.get();
    });
  }
}
