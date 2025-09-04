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
  price: number;
  sale: number;
  description: string;
  sliderImage?: string;
  stock: number;
  rating: number;
  image: string;
}
