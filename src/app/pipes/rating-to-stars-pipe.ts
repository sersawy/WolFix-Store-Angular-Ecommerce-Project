import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ratingToStars',
})
export class RatingToStarsPipe implements PipeTransform {
  transform(value: number): unknown {
    const fullStars = Math.floor(value);
    const hasHalfStar = value % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return '★'.repeat(fullStars) + (hasHalfStar ? '☆' : '') + '☆'.repeat(emptyStars);
  }
}
