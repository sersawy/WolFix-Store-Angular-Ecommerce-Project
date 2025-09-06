import { Component, inject, OnInit } from '@angular/core';
import { ProductsContainer } from '../../components/products-container/products-container';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsApiService } from '../../services/products-api-service';
import { IProductsApi } from '../../models/iproducts-api';

@Component({
  selector: 'app-category',
  imports: [ProductsContainer],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category implements OnInit {
  private productsService = inject(ProductsApiService);
  private activateRoute = inject(ActivatedRoute);
  products: IProductsApi[] = [];
  total!: number;

  category = this.activateRoute.snapshot.paramMap.get('category');
  ngOnInit(): void {
    if (!this.category) return;
    this.productsService.getAllProductsByCategory(this.category).subscribe((data) => {
      this.products = data.products;
      this.total = data.total;
    });
  }
}
