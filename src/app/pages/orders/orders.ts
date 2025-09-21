import { Router } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { OrderItem } from '../../components/order-item/order-item';
import { OrderService } from '../../services/order-service';
import { Order } from '../../models/iorder';
import { OrderCard } from '../../components/order-card/order-card';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-orders',
  imports: [OrderCard],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders implements OnInit {
  orderService = inject(OrderService);
  spinner = inject(NgxSpinnerService);
  router = inject(Router);

  orders: Order[] = [];
  ngOnInit(): void {
    // this.spinner.show();

    this.orderService.getALLOrders().subscribe({
      next: (data) => {
        this.orders = data.data;
        // this.spinner.hide();
      },
      error: () => this.router.navigate(['/']),
    });
  }
}
