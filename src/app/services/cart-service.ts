import { inject, Injectable } from '@angular/core';
import { ICart, IProductsApi } from '../models/iproducts-api';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey: string = 'currentCart';
  toastr = inject(ToastrService);
  truncate(text: string, maxLength: number): string {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }
  get(): ICart[] {
    const cart = localStorage.getItem(this.cartKey);
    if (!cart) return [];
    return JSON.parse(cart);
  }
  set(items: ICart[]) {
    localStorage.setItem(this.cartKey, JSON.stringify(items));
  }
  add(product: IProductsApi, qty: number = 1): ICart[] {
    const cart = this.get();
    const existing = cart.find((i) => i.product.id === product.id);
    if (existing) existing.qty += qty;
    else cart.push({ product, qty });
    this.set(cart);
    this.toastr.success(`${qty} × ${this.truncate(product.name, 25)}`, 'Add to Cart 🛒');
    return cart;
  }
  remove(productId: number): ICart[] {
    const cart = this.get();
    const product = cart.find((p) => p.product.id === +productId);
    const newCart = cart.filter((i) => i.product.id !== +productId);
    this.set(newCart);
    if (product)
      this.toastr.error(`${this.truncate(product.product.name, 25)}`, 'Removed from Cart ❌');

    return newCart;
  }
  removeCurrentCart(): void {
    localStorage.removeItem('currentCart');
  }
  updateQty(productId: number, qty: number): ICart[] {
    const cart = this.get();
    const product = cart.find((p) => p.product.id === +productId);

    if (product) {
      product.qty = qty;
      this.set(cart);
      this.toastr.info(
        `${qty} × ${this.truncate(product.product.name, 25)}`,
        'Quantity Updated 🔄'
      );
    }

    return cart;
  }
  total(): number {
    return this.get()?.reduce(
      (sum, p) => sum + ((p.product.price * (100 - p.product.sale)) / 100) * p.qty,
      0
    );
  }
  getTotalQuantity(): number {
    return this.get()?.reduce((sum, p) => sum + p.qty, 0);
  }
}
