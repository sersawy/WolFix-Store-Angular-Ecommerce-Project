import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ICart } from '../../models/iproducts-api';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart-service';
import { ImageWithLoading } from '../image-with-loading/image-with-loading';

@Component({
  selector: 'app-product-cart-card',
  imports: [CurrencyPipe, FormsModule, ImageWithLoading],
  templateUrl: './product-cart-card.html',
  styleUrl: './product-cart-card.css',
  host: {
    '[style.display]': '"contents"',
  },
})
export class ProductCartCard {
  @Input() item: ICart = {} as ICart;
  cartService = inject(CartService);

  updateQty() {
    this.cartService.updateQty(this.item.product.id, this.item.qty);
  }
  increaseQty() {
    this.item.qty++;
    this.updateQty();
  }
  decreaseQty() {
    if (this.item.qty === 1) return this.removeItem();
    this.item.qty--;
    this.updateQty();
  }
  removeItem() {
    this.cartService.remove(this.item.product.id);
  }
}
