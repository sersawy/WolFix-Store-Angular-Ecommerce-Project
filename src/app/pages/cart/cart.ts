import { Component, inject } from '@angular/core';
import { BtnPrimary } from '../../components/buttons/btn-primary/btn-primary';
import { BtnSecondary } from '../../components/buttons/btn-secondary/btn-secondary';
import { ICart } from '../../models/iproducts-api';
import { CartService } from '../../services/cart-service';
import { ProductCartCard } from '../../components/product-cart-card/product-cart-card';
import { EmptyCart } from '../../components/empty-cart/empty-cart';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [BtnPrimary, BtnSecondary, ProductCartCard, EmptyCart, CurrencyPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  cartService = inject(CartService);
}
