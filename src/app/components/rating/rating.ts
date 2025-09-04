import { RatingToStarsPipe } from './../../pipes/rating-to-stars-pipe';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  imports: [RatingToStarsPipe],
  template: `<span class="rating-stars">{{ rating | ratingToStars }}</span>
    <span class="rating-value">{{ rating }}</span>`,
  // templateUrl: './rating.html',
  styleUrl: './rating.css',
})
export class Rating {
  @Input() rating!: number;
}
