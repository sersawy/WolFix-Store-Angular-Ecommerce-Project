import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsContainer } from '../../components/products-container/products-container';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsApiService } from '../../services/products-api-service';
import { IFilter, IItems, IProductsApi } from '../../models/iproducts-api';
import { FitlerSidebar } from '../../components/fitler-sidebar/fitler-sidebar';
import { NgxSpinnerService } from 'ngx-spinner';
import { SearchService } from '../../services/search-service';
import { Subject, takeUntil } from 'rxjs';
import { IPagination } from '../../models/ipagination';

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
  private router = inject(Router);

  products: IProductsApi[] = [];
  filteredProducts: IProductsApi[] = [];
  brands: IItems = {} as IItems;
  total!: number;
  minPrice!: number;
  maxPrice!: number;
  filterData: IFilter = {} as IFilter;
  pagination: IPagination = { limit: 5, offset: 0 };
  category = this.activateRoute.snapshot.paramMap.get('category');
  firstStatus: boolean = true;
  private destroy$ = new Subject<void>();
  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((params) => {
      this.category = params.get('category');
      if (!this.category) return;
      this.getAllProducts();
      this.searchService.searchTerm$.pipe(takeUntil(this.destroy$)).subscribe((searchTerm) => {
        this.filterData.search = searchTerm;
        if (!this.category) return;
        this.getAllProducts();
      });
    });
  }
  onFiltersChanged(filters: IFilter) {
    this.filterData = filters;
    if (!this.category) return;
    this.getAllProducts();
  }
  getAllProducts() {
    this.spinner.show();
    this.productService
      .getAllProductsByCategory(
        this.category!,
        this.pagination.limit,
        this.pagination.offset,
        this.filterData,
      )
      .subscribe({
        next: (data) => {
          this.products = data.products;
          if (!this.products.length && this.firstStatus) {
            this.spinner.hide();
            this.router.navigate(['/404']);
          }
          this.filteredProducts = [...this.products];
          this.brands = data.brands;
          this.total = data.total;
          this.minPrice = data.minPrice;
          this.maxPrice = data.maxPrice;
          this.spinner.hide();
          this.firstStatus = false;
        },
        error: () => {
          this.spinner.hide();
          this.router.navigate(['/404']);
        },
      });
  }
  onSortChanged(sort: string) {
    this.filterData.sort = sort;
    if (!this.category) return;
    this.getAllProducts();
  }
  onPageChanged(pagination: IPagination) {
    this.pagination = pagination;
    this.getAllProducts();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
