import { Component, Input } from '@angular/core';
import { ImageWithLoading } from '../image-with-loading/image-with-loading';
import { CurrencyPipe } from '@angular/common';
import { Item } from '../../models/iorder';

@Component({
  selector: 'app-order-item',
  imports: [ImageWithLoading, CurrencyPipe],
  templateUrl: './order-item.html',
  styleUrl: './order-item.css',
})
export class OrderItem {
  @Input() item: Item = {} as Item;
}
