import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-card-preview',
  imports: [],
  templateUrl: './card-preview.html',
  styleUrl: './card-preview.css',
})
export class CardPreview {
  @Input() form!: FormGroup;
  flip = false;

  get cardNumber() {
    const num = this.form?.get('cardNumber')?.value || '';
    return String(num).replace(/(\d{4})(?=\d)/g, '$1 ');
  }

  get cardName() {
    return this.form?.get('cardName')?.value || 'FULL NAME';
  }

  get expiryDate() {
    const month = this.form.get('expiryMonth')?.value || '00';
    const year = this.form.get('expiryYear')?.value || '00';
    return `${month}/${year}`;
  }

  get cvv() {
    return this.form?.get('cvv')?.value || '';
  }

  toggleFlip(flip: boolean) {
    this.flip = flip;
  }
}
