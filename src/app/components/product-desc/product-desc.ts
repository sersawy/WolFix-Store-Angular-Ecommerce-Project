import { Component, Input } from '@angular/core';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@Component({
  selector: 'app-product-desc',
  imports: [ScrollPanelModule],
  templateUrl: './product-desc.html',
  styleUrl: './product-desc.css',
})
export class ProductDesc {
  @Input() description!: string;
}
