import { Component, Input } from '@angular/core';
import { ICart } from '../../models/iproducts-api';
import { ImageWithLoading } from '../image-with-loading/image-with-loading';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-checkout-item',
  imports: [ImageWithLoading, CurrencyPipe],
  templateUrl: './checkout-item.html',
  styleUrl: './checkout-item.css',
})
export class CheckoutItem {
  @Input() item: ICart = {} as ICart;
}
