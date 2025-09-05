import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IProductsApi } from '../../models/iproducts-api';
import { BtnPrimary } from '../buttons/btn-primary/btn-primary';
import { BtnSecondary } from '../buttons/btn-secondary/btn-secondary';
import { Rating } from '../rating/rating';
import { CurrencyPipe } from '@angular/common';
import { ProductPrice } from '../product-price/product-price';

@Component({
  selector: 'app-product-card',
  imports: [BtnPrimary, BtnSecondary, Rating, CurrencyPipe, ProductPrice],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard implements OnChanges {
  @Input() product!: IProductsApi;
  @Input() action: boolean = true;
  currentPrice!: number;
  ngOnChanges(changes: SimpleChanges): void {
    this.currentPrice = (this.product.price * (100 - this.product.sale)) / 100;
  }
}
