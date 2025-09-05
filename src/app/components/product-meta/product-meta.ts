import { KeyValuePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-meta',
  imports: [KeyValuePipe],
  templateUrl: './product-meta.html',
  styleUrl: './product-meta.css',
})
export class ProductMeta {
  @Input() metaItems: any;
}
