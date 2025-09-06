import { Component, inject, OnInit } from '@angular/core';
import { ProductsContainer } from '../../components/products-container/products-container';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsApiService } from '../../services/products-api-service';
import { IFilter, IItems, IProductsApi } from '../../models/iproducts-api';
import { FitlerSidebar } from '../../components/fitler-sidebar/fitler-sidebar';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-category',
  imports: [ProductsContainer, FitlerSidebar],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category implements OnInit {
  private productService = inject(ProductsApiService);
  private activateRoute = inject(ActivatedRoute);
  private spinner = inject(NgxSpinnerService);

  products: IProductsApi[] = [];
  filteredProducts: IProductsApi[] = [];
  brands: IItems = {} as IItems;
  total!: number;
  minPrice!: number;
  maxPrice!: number;

  category = this.activateRoute.snapshot.paramMap.get('category');
  ngOnInit(): void {
    if (!this.category) return;
    this.getAllProducts(this.category);
  }
  onFiltersChanged(filters: IFilter) {
    this.getAllProducts(this.category!, 20, 0, filters);
  }
  getAllProducts(category: string, limit: number = 20, offset: number = 0, filters: IFilter = {}) {
    this.spinner.show();
    this.productService
      .getAllProductsByCategory(category, limit, offset, filters)
      .subscribe((data) => {
        this.products = data.products;
        this.filteredProducts = [...this.products];
        this.brands = data.brands;
        this.total = data.total;
        this.minPrice = data.minPrice;
        this.maxPrice = data.maxPrice;
        this.spinner.hide();
      });
  }
}
