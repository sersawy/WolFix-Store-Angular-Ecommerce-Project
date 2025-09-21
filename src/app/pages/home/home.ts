import { Component, inject, OnInit } from '@angular/core';

import { CategoryCarousel } from '../../components/category-carousel/category-carousel';
import { ProductsApiService } from '../../services/products-api-service';
import { ICategory } from '../../models/iproducts-api';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  imports: [CategoryCarousel],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private spinner = inject(NgxSpinnerService);
  productService = inject(ProductsApiService);

  categories: ICategory[] = [];

  ngOnInit(): void {
    // this.spinner.show();
    this.productService.getAllCategories().subscribe((data) => {
      this.categories = data.categories;
      // this.spinner.hide();
    });
  }
}
