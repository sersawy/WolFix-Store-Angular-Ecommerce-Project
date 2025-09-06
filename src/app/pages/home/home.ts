import { Component, inject, OnInit } from '@angular/core';

import { CategoryCarousel } from '../../components/category-carousel/category-carousel';
import { ProductsApiService } from '../../services/products-api-service';

@Component({
  selector: 'app-home',
  imports: [CategoryCarousel],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  productService = inject(ProductsApiService);

  categories: string[] = [];

  ngOnInit(): void {
    this.productService.getAllCategories().subscribe((data) => {
      this.categories = data.categories;
    });
  }
}
