import { Component, Input } from '@angular/core';
import { IOrderCreateRes, Order } from '../../models/iorder';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { OrderItem } from '../order-item/order-item';
import { BtnPrimary } from '../buttons/btn-primary/btn-primary';
import { BtnSecondary } from '../buttons/btn-secondary/btn-secondary';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-card',
  imports: [DatePipe, OrderItem, CurrencyPipe, RouterLink],
  templateUrl: './order-card.html',
  styleUrl: './order-card.css',
})
export class OrderCard {
  @Input() order: Order = {} as Order;
}
