import { Component, inject, OnInit } from '@angular/core';
import { ProductsApiService } from '../../services/products-api-service';
import { ProductCard } from '../../components/product-card/product-card';
import { IFilter, IItems, IProductsApi } from '../../models/iproducts-api';
import { FitlerSidebar } from '../../components/fitler-sidebar/fitler-sidebar';
import { SliderProducts } from '../../components/slider-products/slider-products';
import { ProductsContainer } from '../../components/products-container/products-container';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-products',
  imports: [ProductCard, FitlerSidebar, SliderProducts, ProductsContainer],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  productService = inject(ProductsApiService);
  products!: IProductsApi[];
  filteredProducts!: IProductsApi[];
  categories: IItems = {} as IItems;
  brands: IItems = {} as IItems;
  sliderProducts!: IProductsApi[];
  total!: number;
  minPrice!: number;
  maxPrice!: number;
  private spinner = inject(NgxSpinnerService);

  ngOnInit(): void {
    this.productService.getAllSliderProducts().subscribe((data) => {
      this.getAllProducts();
      this.sliderProducts = data.products;
    });
  }
  onFiltersChanged(filters: IFilter) {
    this.getAllProducts(20, 0, filters);
  }
  getAllProducts(limit: number = 20, offset: number = 0, filters: IFilter = {}) {
    this.spinner.show();
    this.productService.getAllProducts(limit, offset, filters).subscribe((data) => {
      console.log(data);

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
}
