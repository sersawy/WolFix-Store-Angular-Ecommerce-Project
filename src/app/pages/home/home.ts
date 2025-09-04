import { Component } from '@angular/core';
import { ProductImageSlider } from '../../components/product-image-slider/product-image-slider';

@Component({
  selector: 'app-home',
  imports: [ProductImageSlider],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
