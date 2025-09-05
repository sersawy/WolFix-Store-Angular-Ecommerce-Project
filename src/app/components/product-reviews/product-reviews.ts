import { Component, Input } from '@angular/core';
import { Rating } from '../rating/rating';
import { IReview } from '../../models/iproducts-api';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-product-reviews',
  imports: [Rating, DatePipe],
  templateUrl: './product-reviews.html',
  styleUrl: './product-reviews.css',
})
export class ProductReviews {
  @Input() reviews!: IReview[];
}
