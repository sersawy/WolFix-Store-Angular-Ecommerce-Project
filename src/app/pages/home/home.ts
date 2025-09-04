import { Component } from '@angular/core';
import { ProductImageSlider } from '../../components/product-image-slider/product-image-slider';
import { ProductReviews } from '../../components/product-reviews/product-reviews';
import { IReview } from '../../models/ireview';

@Component({
  selector: 'app-home',
  imports: [ProductImageSlider, ProductReviews],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  review: IReview = {
    name: 'ahmed',
    date: '20/55/2025',
    rating: 4.5,
    review: 'fdsdfdsfsdfsdfsdfsdf',
  };
}
