import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IOrder, IOrderCreateRes, IOrderRes, IOrdersRes } from '../models/iorder';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_URLS } from '../constants/api_urls';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient);
  private orderSubject = new BehaviorSubject<IOrderCreateRes>({} as IOrderCreateRes);
  orderData$ = this.orderSubject.asObservable();
  createOrder(order: IOrder): Observable<IOrderCreateRes> {
    return this.http.post<IOrderCreateRes>(API_URLS.orders.create, order);
  }
  setOrderData(order: IOrderCreateRes) {
    this.orderSubject.next(order);
  }
  clearOrderData() {
    this.orderSubject.next({} as IOrderCreateRes);
  }
  getALLOrders(): Observable<IOrdersRes> {
    return this.http.get<IOrdersRes>(API_URLS.orders.getALL);
  }
  getOrderById(id: number): Observable<IOrderRes> {
    return this.http.get<IOrderRes>(API_URLS.orders.getById, { params: { id } });
  }
}
