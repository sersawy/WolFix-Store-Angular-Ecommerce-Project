import { environment } from '../../environments/environment.development';

export const API_URLS = {
  product: {
    getALL: `${environment.baseUrl}/products/`,
    getById: `${environment.baseUrl}/products`,
    getByCategory: `${environment.baseUrl}/products/category`,
    getByBrand: `${environment.baseUrl}/products/brand`,
    getAllCategories: `${environment.baseUrl}/products/categories`,
  },
  auth: {
    login: `${environment.baseUrl}/auth/?action=login`,
    register: `${environment.baseUrl}/auth/?action=register`,
    verify: `${environment.baseUrl}/auth/?action=verify`,
    updateProfile: `${environment.baseUrl}/auth/?action=updateProfile`,
    changePassword: `${environment.baseUrl}/auth/?action=changePassword`,
  },
  orders: {
    create: `${environment.baseUrl}/orders/`,
    getALL: `${environment.baseUrl}/orders/`,
    getById: `${environment.baseUrl}/orders/`,
  },
};
