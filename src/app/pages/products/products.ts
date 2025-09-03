import { Component, inject, OnInit } from '@angular/core';
import { ProductsApiService } from '../../services/products-api-service';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  productService = inject(ProductsApiService);
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data) => console.log(data));
  }
}
