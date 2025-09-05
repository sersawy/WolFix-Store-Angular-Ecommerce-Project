import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IProductsApi } from '../../models/iproducts-api';
import { CurrencyPipe } from '@angular/common';
import { IncreaseFont } from '../../directives/increase-font';

@Component({
  selector: 'app-product-price',
  imports: [CurrencyPipe, IncreaseFont],
  templateUrl: './product-price.html',
  styleUrl: './product-price.css',
})
export class ProductPrice implements OnChanges {
  @Input() product!: IProductsApi;
  @Input() increaseBy: number = 0;
  currentPrice!: number;
  ngOnChanges(changes: SimpleChanges): void {
    this.currentPrice = (this.product.price * (100 - this.product.sale)) / 100;
  }
}
