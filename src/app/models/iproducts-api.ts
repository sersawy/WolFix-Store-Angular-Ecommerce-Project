export interface IProductsAPIRes {
  limit: number;
  products: IProductsApi[];
  offset: number;
  total: number;
}

export interface IProductsApi {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: string;
  sale: string;
  description: string;
  sliderImage?: string;
  stock: number;
  rating: string;
}
