import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-with-loading',
  imports: [CommonModule],
  templateUrl: './image-with-loading.html',
  styleUrl: './image-with-loading.css',
})
export class ImageWithLoading {
  @Input() image!: string;

  isLoading: boolean;

  constructor() {
    this.isLoading = true;
  }

  hideLoader() {
    this.isLoading = false;
  }
}
