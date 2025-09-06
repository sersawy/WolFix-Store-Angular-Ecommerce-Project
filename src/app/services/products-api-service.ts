import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategoriesAPIRes, IFilter, IProductsApi, IProductsAPIRes } from '../models/iproducts-api';
import { API_URLS } from '../constants/api_urls';

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService {
  private http = inject(HttpClient);
  getAllProducts(
    limit: number = 20,
    offset: number = 0,
    filters: IFilter = {}
  ): Observable<IProductsAPIRes> {
    return this.http.get<IProductsAPIRes>(API_URLS.product.getALL, {
      params: this.handelParams(limit, offset, filters),
    });
  }
  getAllProductsByCategory(
    category: string,
    limit: number = 20,
    offset: number = 0,
    filters: IFilter = {}
  ): Observable<IProductsAPIRes> {
    return this.http.get<IProductsAPIRes>(`${API_URLS.product.getByCategory}/${category}`, {
      params: this.handelParams(limit, offset, filters),
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
  handelParams(limit: number, offset: number, filters: any): HttpParams {
    let params = new HttpParams().set('limit', limit).set('offset', offset);
    if (filters.minPrice) params = params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params = params.set('maxPrice', filters.maxPrice);
    if (filters.rating) params = params.set('rating', filters.rating);
    if (filters.availability) params = params.set('availability', filters.availability);

    if (filters.categories) {
      filters.categories.forEach((cat: string) => {
        params = params.append('categories[]', cat);
      });
    }

    if (filters.brands) {
      filters.brands.forEach((brand: string) => {
        params = params.append('brands[]', brand);
      });
    }
    return params;
  }
}
