import { Component, Input, model, OnInit } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { IThumbnail } from '../../models/iproducts-api';

@Component({
  selector: 'app-product-image-slider',
  imports: [GalleriaModule],
  templateUrl: './product-image-slider.html',
  styleUrl: './product-image-slider.css',
})
export class ProductImageSlider {
  @Input() images!: IThumbnail[];

  responsiveOptions: any[] = [
    {
      breakpoint: '1300px',
      numVisible: 4,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
    },
  ];
}
