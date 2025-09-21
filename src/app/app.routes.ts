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
import { OrderConfirmation } from './pages/order-confirmation/order-confirmation';
import { Orders } from './pages/orders/orders';
import { OrderDetail } from './pages/order-detail/order-detail';
import { NotFound } from './pages/not-found/not-found';
import { authGuard } from './guards/auth-guard';
import { AccountSettings } from './pages/account-settings/account-settings';
import { ContactUs } from './pages/contact-us/contact-us';
import { AboutUs } from './pages/about-us/about-us';

export const routes: Routes = [
  { path: '', component: Home, title: 'WolFix Store' },
  { path: 'home', component: Home, title: 'WolFix Store' },
  { path: 'products', component: Products, title: 'Products - WolFix Store' },
  {
    path: 'product/:id',
    component: ProductDetail,
    title: 'Product Detail - WolFix Store',
  },
  { path: 'category/:category', component: Category, title: 'Category - WolFix Store' },
  { path: 'cart', component: Cart, title: 'Shopping Cart - WolFix Store' },
  {
    path: 'orders',
    component: Orders,
    canActivate: [authGuard],
    title: 'My Orders - WolFix Store',
  },
  {
    path: 'order/:id',
    component: OrderDetail,
    canActivate: [authGuard],
    title: 'Order Detail - WolFix Store',
  },
  {
    path: 'checkout',
    component: Checkout,
    canActivate: [authGuard],
    title: 'Checkout - WolFix Store',
  },
  {
    path: 'order-confirmation',
    component: OrderConfirmation,
    canActivate: [authGuard],
    title: 'Order Confirmation - WolFix Store',
  },
  {
    path: 'login',
    component: Login,
    canActivate: [guestGuard],
    title: 'Login - WolFix Store',
  },
  {
    path: 'signup',
    component: SignUp,
    canActivate: [guestGuard],
    title: 'Sign Up - WolFix Store',
  },
  {
    path: 'settings',
    component: AccountSettings,
    canActivate: [authGuard],
    title: 'Account Settings - WolFix Store',
  },
  {
    path: 'contact',
    component: ContactUs,
    title: 'Contact Us - WolFix Store',
  },
  {
    path: 'about',
    component: AboutUs,
    title: 'About Us - WolFix Store',
  },
  { path: '**', component: NotFound, title: 'Page Not Found - WolFix Store' },
];
