import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ProductsApiService } from '../../services/products-api-service';
import { IProductsApi } from '../../models/iproducts-api';
import { ProductCard } from '../product-card/product-card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-container',
  imports: [ProductCard, FormsModule],
  templateUrl: './products-container.html',
  styleUrl: './products-container.css',
})
export class ProductsContainer {
  @Input() products!: IProductsApi[];
  @Input() total!: number;
  @Input() title: string = '';
  @Output() sortChanged: EventEmitter<string> = new EventEmitter<string>();
  sortType: string = 'relevance';
  onSort() {
    this.sortChanged.emit(this.sortType);
  }
}
