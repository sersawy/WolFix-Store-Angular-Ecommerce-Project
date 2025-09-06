import { Component, inject, Input } from '@angular/core';
import { ProductsApiService } from '../../services/products-api-service';
import { IProductsApi } from '../../models/iproducts-api';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-products-container',
  imports: [ProductCard],
  templateUrl: './products-container.html',
  styleUrl: './products-container.css',
})
export class ProductsContainer {
  @Input() products!: IProductsApi[];
  @Input() total!: number;
  @Input() title: string = '';
}
