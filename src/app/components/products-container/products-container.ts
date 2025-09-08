import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ProductsApiService } from '../../services/products-api-service';
import { IProductsApi } from '../../models/iproducts-api';
import { ProductCard } from '../product-card/product-card';
import { FormsModule } from '@angular/forms';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { IPagination } from '../../models/ipagination';

@Component({
  selector: 'app-products-container',
  imports: [ProductCard, FormsModule, PaginatorModule],
  templateUrl: './products-container.html',
  styleUrl: './products-container.css',
})
export class ProductsContainer {
  @Input() products!: IProductsApi[];
  @Input() total!: number;
  @Input() title: string = '';
  @Output() sortChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output() pageChanged: EventEmitter<IPagination> = new EventEmitter<IPagination>();
  sortType: string = 'relevance';

  first: number = 0;
  rows: number = 5;
  onSort() {
    this.sortChanged.emit(this.sortType);
  }
  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 5;
    window.scrollTo({ top: 300, behavior: 'smooth' });
    this.pageChanged.emit({ limit: this.rows, offset: this.first });
  }
}
