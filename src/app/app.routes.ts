import { Checkout } from './pages/checkout/checkout';
import { Category } from './pages/category/category';
import { ProductDetail } from './pages/product-detail/product-detail';
import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Cart } from './pages/cart/cart';
import { Login } from './pages/login/login';
import { SignUp } from './pages/sign-up/sign-up';
import { Products } from './pages/products/products';
import { guestGuard } from './guards/guest-guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'products', component: Products },
  { path: 'product/:id', component: ProductDetail },
  { path: 'category/:category', component: Category },
  { path: 'cart', component: Cart },
  { path: 'checkout', component: Checkout },
  { path: 'login', component: Login, canActivate: [guestGuard] },
  { path: 'signup', component: SignUp, canActivate: [guestGuard] },
];
