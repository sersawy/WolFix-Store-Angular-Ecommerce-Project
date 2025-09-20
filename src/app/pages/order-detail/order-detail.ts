import { OrderFull } from './../../models/iorder';
import { map } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { BtnSecondary } from '../../components/buttons/btn-secondary/btn-secondary';
import { OrderItem } from '../../components/order-item/order-item';

@Component({
  selector: 'app-order-detail',
  imports: [DatePipe, CurrencyPipe, BtnSecondary, OrderItem],
  templateUrl: './order-detail.html',
  styleUrl: './order-detail.css',
})
export class OrderDetail implements OnInit {
  activateRoute = inject(ActivatedRoute);
  router = inject(Router);
  orderService = inject(OrderService);
  spinner = inject(NgxSpinnerService);

  id!: number;
  order: OrderFull = {} as OrderFull;
  ngOnInit(): void {
    this.spinner.show();
    this.id = Number(this.activateRoute.snapshot.paramMap.get('id'));
    this.orderService.getOrderById(this.id).subscribe({
      next: (data) => {
        this.order = data.data;
        this.spinner.hide();
      },
      error: () => {
        this.spinner.hide();
        this.router.navigate(['/404']);
      },
    });
  }
}
