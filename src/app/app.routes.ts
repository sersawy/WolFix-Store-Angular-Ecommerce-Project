import { ProductDetail } from './pages/product-detail/product-detail';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Cart } from './pages/cart/cart';
import { Login } from './pages/login/login';
import { SignUp } from './pages/sign-up/sign-up';
import { Products } from './pages/products/products';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'products', component: Products },
  { path: 'product/:id', component: ProductDetail },
  { path: 'cart', component: Cart },
  { path: 'login', component: Login },
  { path: 'signup', component: SignUp },
];
