import { Component, Input } from '@angular/core';
import { Rating } from '../rating/rating';
import { IReview } from '../../models/ireview';

@Component({
  selector: 'app-product-reviews',
  imports: [Rating],
  templateUrl: './product-reviews.html',
  styleUrl: './product-reviews.css',
})
export class ProductReviews {
  @Input() review!: IReview;
}
