import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategoriesAPIRes, IProductsApi, IProductsAPIRes } from '../models/iproducts-api';
import { API_URLS } from '../constants/api_urls';

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService {
  private http = inject(HttpClient);
  getAllProducts(limit: number = 20, offset: number = 0): Observable<IProductsAPIRes> {
    return this.http.get<IProductsAPIRes>(API_URLS.product.getALL, { params: { limit, offset } });
  }
  getAllProductsByCategory(
    category: string,
    limit: number = 20,
    offset: number = 0
  ): Observable<IProductsAPIRes> {
    return this.http.get<IProductsAPIRes>(`${API_URLS.product.getByCategory}/${category}`, {
      params: { limit, offset },
    });
  }
  getAllSliderProducts(): Observable<IProductsAPIRes> {
    return this.http.get<IProductsAPIRes>(API_URLS.product.getALL, { params: { hasSlider: 1 } });
  }
  getProductById(id: number): Observable<IProductsApi> {
    return this.http.get<IProductsApi>(`${API_URLS.product.getById}/${id}`);
  }
  getAllCategories(): Observable<ICategoriesAPIRes> {
    return this.http.get<ICategoriesAPIRes>(API_URLS.product.getAllCategories);
  }
}
