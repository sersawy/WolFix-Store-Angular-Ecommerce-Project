import { Cart } from './../pages/cart/cart';
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
  image: string;
  sliderImage?: string;
  stock: number;
  rating: number;
  newArrival: number;
  thumbnails?: IThumbnail[];
  reviews?: IReview[];
  tags?: string[];
  metaItems?: any[];
  specItems?: any[];
}

export interface IReview {
  name: string;
  date: Date;
  rating: number;
  review: string;
}

export interface IThumbnail {
  itemImageSrc: string;
  thumbnailImageSrc: string;
  alt: string;
  title: string;
}
export interface ICart {
  product: IProductsApi;
  qty: number;
}
