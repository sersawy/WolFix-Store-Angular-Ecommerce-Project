import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsApiService } from '../../services/products-api-service';
import { ProductCard } from '../../components/product-card/product-card';
import { IFilter, IItems, IProductsApi } from '../../models/iproducts-api';
import { FitlerSidebar } from '../../components/fitler-sidebar/fitler-sidebar';
import { SliderProducts } from '../../components/slider-products/slider-products';
import { ProductsContainer } from '../../components/products-container/products-container';
import { NgxSpinnerService } from 'ngx-spinner';
import { SearchService } from '../../services/search-service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-products',
  imports: [FitlerSidebar, SliderProducts, ProductsContainer],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit, OnDestroy {
  productService = inject(ProductsApiService);
  searchService = inject(SearchService);
  products!: IProductsApi[];
  filteredProducts!: IProductsApi[];
  categories: IItems = {} as IItems;
  brands: IItems = {} as IItems;
  sliderProducts!: IProductsApi[];
  total!: number;
  minPrice!: number;
  maxPrice!: number;
  filterData: IFilter = {} as IFilter;
  private destroy$ = new Subject<void>();
  private spinner = inject(NgxSpinnerService);

  ngOnInit(): void {
    this.productService.getAllSliderProducts().subscribe((data) => {
      this.getAllProducts();
      this.sliderProducts = data.products;
    });
    this.searchService.searchTerm$.pipe(takeUntil(this.destroy$)).subscribe((searchTerm) => {
      this.filterData.search = searchTerm;
      this.getAllProducts(20, 0, this.filterData);
    });
  }
  onFiltersChanged(filters: IFilter) {
    this.filterData = filters;
    this.getAllProducts(20, 0, filters);
  }
  getAllProducts(limit: number = 20, offset: number = 0, filters: IFilter = {}) {
    this.spinner.show();
    this.productService.getAllProducts(limit, offset, filters).subscribe((data) => {
      this.products = data.products;
      this.filteredProducts = [...this.products];
      this.categories = data.categories;
      this.brands = data.brands;
      this.total = data.total;
      this.minPrice = data.minPrice;
      this.maxPrice = data.maxPrice;
      this.spinner.hide();
    });
  }
  onSortChanged(sort: string) {
    this.filterData.sort = sort;
    this.getAllProducts(20, 0, this.filterData);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
