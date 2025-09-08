import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsContainer } from '../../components/products-container/products-container';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsApiService } from '../../services/products-api-service';
import { IFilter, IItems, IProductsApi } from '../../models/iproducts-api';
import { FitlerSidebar } from '../../components/fitler-sidebar/fitler-sidebar';
import { NgxSpinnerService } from 'ngx-spinner';
import { SearchService } from '../../services/search-service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-category',
  imports: [ProductsContainer, FitlerSidebar],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category implements OnInit, OnDestroy {
  private productService = inject(ProductsApiService);
  private activateRoute = inject(ActivatedRoute);
  private searchService = inject(SearchService);
  private spinner = inject(NgxSpinnerService);

  products: IProductsApi[] = [];
  filteredProducts: IProductsApi[] = [];
  brands: IItems = {} as IItems;
  total!: number;
  minPrice!: number;
  maxPrice!: number;
  filterData: IFilter = {} as IFilter;
  category = this.activateRoute.snapshot.paramMap.get('category');
  private destroy$ = new Subject<void>();
  ngOnInit(): void {
    if (!this.category) return;
    this.getAllProducts(this.category);
    this.searchService.searchTerm$.pipe(takeUntil(this.destroy$)).subscribe((searchTerm) => {
      this.filterData.search = searchTerm;
      if (!this.category) return;
      this.getAllProducts(this.category, 20, 0, this.filterData);
    });
  }
  onFiltersChanged(filters: IFilter) {
    this.filterData = filters;
    if (!this.category) return;
    this.getAllProducts(this.category, 20, 0, filters);
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
  onSortChanged(sort: string) {
    this.filterData.sort = sort;
    if (!this.category) return;
    this.getAllProducts(this.category, 20, 0, this.filterData);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
