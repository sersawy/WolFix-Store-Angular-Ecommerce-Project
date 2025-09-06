import { ProductsApiService } from './../../services/products-api-service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IProductsApi } from '../../models/iproducts-api';
import { ProductImageSlider } from '../../components/product-image-slider/product-image-slider';
import { ProductReviews } from '../../components/product-reviews/product-reviews';
import { ProductMeta } from '../../components/product-meta/product-meta';
import { ProductTags } from '../../components/product-tags/product-tags';
import { ProductSpec } from '../../components/product-spec/product-spec';
import { ProductDesc } from '../../components/product-desc/product-desc';
import { SplitterModule } from 'primeng/splitter';
import { Rating } from '../../components/rating/rating';
import { ProductPrice } from '../../components/product-price/product-price';
import { ProductCard } from '../../components/product-card/product-card';
import { BtnPrimary } from '../../components/buttons/btn-primary/btn-primary';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { RouterModule } from '@angular/router';
import Material from '@primeuix/themes/material';
import { CartService } from '../../services/cart-service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-detail',
  imports: [
    ProductImageSlider,
    ProductReviews,
    ProductMeta,
    ProductTags,
    ProductSpec,
    ProductDesc,
    SplitterModule,
    Rating,
    ProductPrice,
    ProductCard,
    RouterLink,
    BtnPrimary,
    FormsModule,
    Breadcrumb,
    RouterModule,
  ],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  private productsService = inject(ProductsApiService);
  private activateRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private spinner = inject(NgxSpinnerService);

  id!: number;
  quantity: number = 1;
  product: IProductsApi = {} as IProductsApi;
  relatedProducts: IProductsApi[] = [];
  cartService = inject(CartService);
  items: MenuItem[] = [];
  home: MenuItem = { icon: 'bi bi-house-door', routerLink: '/' };

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((params) => {
      this.spinner.show();
      this.id = Number(params.get('id'));
      if (!this.id) this.router.navigate(['/404']);
      this.productsService.getProductById(this.id).subscribe((data) => {
        this.product = data;
        this.setBreadcrumb();
        this.getRelatedProducts();
      });
    });
  }
  increaseQty() {
    this.quantity += 1;
  }
  decreaseQty() {
    this.quantity -= 1;
    this.quantity = this.quantity <= 0 ? 0 : this.quantity;
  }
  addToCart() {
    this.cartService.add(this.product, this.quantity);
    this.quantity = 1;
  }
  setBreadcrumb() {
    this.items = [
      { label: this.product.category, routerLink: `/category/${this.product.category}` },
      { label: this.product.name },
    ];
  }
  getRelatedProducts() {
    this.productsService.getAllProductsByCategory(this.product.category).subscribe((data) => {
      this.relatedProducts = data.products;
      this.relatedProducts = this.relatedProducts.sort(() => Math.random() - 0.5).slice(0, 8);
      this.spinner.hide();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
