import { environment } from '../../environments/environment.development';

export const API_URLS = {
  products: `${environment.baseUrl}/products`,
  login: `${environment.baseUrl}/auth/login`,
  getByName: `${environment.baseUrl}/products/search`,
};
