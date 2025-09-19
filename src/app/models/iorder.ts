import { ICart } from './iproducts-api';
export interface IOrder {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  payment: string;
  cardNumber: string;
  cardName: string;
  expiryMonth: number;
  expiryYear: number;
  cvv: string;
  IItems: [ICart];
}
export interface IOrderCreateRes {
  success: boolean;
  message: string;
  data: Order;
}
export interface IOrdersRes {
  success: boolean;
  message: string;
  data: Order[];
}
export interface IOrderRes {
  success: boolean;
  message: string;
  data: OrderFull;
}

export interface Order {
  orderId: number;
  total: number;
  created_at: Date;
  status: string;
  items: Item[];
}
export interface OrderFull {
  id: number;
  user_id: number;
  total: number;
  created_at: Date;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  payment: string;
  card_masked: string;
  card_last4: string;
  expiry_month: number;
  expiry_year: number;
  status: string;
  items: Item[];
}

export interface Item {
  id: number;
  order_id: number;
  product_id: number;
  qty: number;
  unit_price: string;
  subtotal: string;
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
}
