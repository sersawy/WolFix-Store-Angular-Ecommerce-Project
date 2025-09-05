import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductsApi, IProductsAPIRes } from '../models/iproducts-api';
import { API_URLS } from '../constants/api_urls';

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService {
  private http = inject(HttpClient);
  getAllProducts(): Observable<IProductsAPIRes> {
    return this.http.get<IProductsAPIRes>(API_URLS.product.getALL);
  }
  getAllProductsByCategory(category: string): Observable<IProductsAPIRes> {
    return this.http.get<IProductsAPIRes>(`${API_URLS.product.getByCategory}/${category}`);
  }
  getAllSliderProducts(): Observable<IProductsAPIRes> {
    return this.http.get<IProductsAPIRes>(API_URLS.product.getALL, { params: { hasSlider: 1 } });
  }
  getProductById(id: number): Observable<IProductsApi> {
    return this.http.get<IProductsApi>(`${API_URLS.product.getById}/${id}`);
  }
}
