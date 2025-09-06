import { Component, inject, Input, OnInit } from '@angular/core';
import { Carousel } from 'primeng/carousel';
import { ProductsApiService } from '../../services/products-api-service';

import { IProductsApi } from '../../models/iproducts-api';
import { ProductCard } from '../../components/product-card/product-card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-carousel',
  imports: [Carousel, ProductCard, RouterLink],
  templateUrl: './category-carousel.html',
  styleUrl: './category-carousel.css',
})
export class CategoryCarousel implements OnInit {
  productService = inject(ProductsApiService);
  products!: IProductsApi[];
  responsiveOptions: any[] | undefined;
  @Input() category: string = '';
  ngOnInit(): void {
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
    this.productService.getAllProductsByCategory(this.category, 7).subscribe((data) => {
      this.products = data.products;
    });
  }
}
