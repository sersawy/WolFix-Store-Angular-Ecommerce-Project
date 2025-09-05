import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-tags',
  imports: [],
  templateUrl: './product-tags.html',
  styleUrl: './product-tags.css',
})
export class ProductTags {
  @Input() tags!: string[];
}
