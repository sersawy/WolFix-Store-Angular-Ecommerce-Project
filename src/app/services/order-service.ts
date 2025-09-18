import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IOrder, IOrderRes } from '../models/iorder';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_URLS } from '../constants/api_urls';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient);
  private orderSubject = new BehaviorSubject<IOrderRes>({} as IOrderRes);
  orderData$ = this.orderSubject.asObservable();
  createOrder(order: IOrder): Observable<IOrderRes> {
    return this.http.post<IOrderRes>(API_URLS.orders.create, order);
  }
  setOrderData(order: IOrderRes) {
    this.orderSubject.next(order);
  }
  clearOrderData() {
    this.orderSubject.next({} as IOrderRes);
  }
}
