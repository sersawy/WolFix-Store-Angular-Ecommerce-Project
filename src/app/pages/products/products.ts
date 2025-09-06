import { Component, inject, OnInit } from '@angular/core';
import { ProductsApiService } from '../../services/products-api-service';
import { ProductCard } from '../../components/product-card/product-card';
import { IProductsApi } from '../../models/iproducts-api';
import { FitlerSidebar } from '../../components/fitler-sidebar/fitler-sidebar';
import { SliderProducts } from '../../components/slider-products/slider-products';
import { ProductsContainer } from '../../components/products-container/products-container';

@Component({
  selector: 'app-products',
  imports: [ProductCard, FitlerSidebar, SliderProducts, ProductsContainer],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  productService = inject(ProductsApiService);
  products!: IProductsApi[];
  sliderProducts!: IProductsApi[];
  total!: number;
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data.products;
      this.total = data.total;
    });

    this.productService
      .getAllSliderProducts()
      .subscribe((data) => (this.sliderProducts = data.products));
  }
}
