import { KeyValuePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-spec',
  imports: [KeyValuePipe],
  templateUrl: './product-spec.html',
  styleUrl: './product-spec.css',
})
export class ProductSpec {
  @Input() specItems: any;
}
