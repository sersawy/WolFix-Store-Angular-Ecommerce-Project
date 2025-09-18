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
export interface IOrderRes {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  orderId: number;
  total: number;
  created_at: Date;
  status: string;
  items: Item[];
}

export interface Item {
  product_id: number;
  name: string;
  qty: number;
  unit_price: number;
  subtotal: number;
}
