import { environment } from '../../environments/environment.development';

export const API_URLS = {
  product: {
    getALL: `${environment.baseUrl}/products`,
    getById: `${environment.baseUrl}/products`,
    getByCategory: `${environment.baseUrl}/products/category`,
    getByBrand: `${environment.baseUrl}/products/brand`,
    getAllCategories: `${environment.baseUrl}/products/categories`,
  },
};
