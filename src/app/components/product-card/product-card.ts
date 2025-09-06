import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IProductsApi } from '../../models/iproducts-api';
import { BtnPrimary } from '../buttons/btn-primary/btn-primary';
import { BtnSecondary } from '../buttons/btn-secondary/btn-secondary';
import { Rating } from '../rating/rating';
import { ProductPrice } from '../product-price/product-price';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-product-card',
  imports: [BtnPrimary, BtnSecondary, Rating, ProductPrice],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard implements OnChanges {
  @Input() product!: IProductsApi;
  @Input() action: boolean = true;
  cartService = inject(CartService);

  currentPrice!: number;
  ngOnChanges(changes: SimpleChanges): void {
    this.currentPrice = (this.product.price * (100 - this.product.sale)) / 100;
  }

  addToCart() {
    this.cartService.add(this.product);
  }
}
