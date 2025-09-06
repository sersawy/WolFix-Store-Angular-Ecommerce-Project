export interface IProductsAPIRes {
  limit: number;
  products: IProductsApi[];
  offset: number;
  total: number;
  minPrice: number;
  maxPrice: number;
  categories: IItems;
  brands: IItems;
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
export interface ICategoriesAPIRes {
  categories: ICategory[];
  total: number;
}
export interface ICategory {
  category: string;
  brands: string[];
  totalBrands: number;
}
export interface IItems {
  items: string[];
  total: number;
}
export interface IFilter {
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  categories?: string[];
  brands?: string[];
  availability?: string;
}
