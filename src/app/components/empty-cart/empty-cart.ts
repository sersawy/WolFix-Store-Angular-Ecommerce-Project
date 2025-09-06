import { Component } from '@angular/core';
import { BtnPrimary } from '../buttons/btn-primary/btn-primary';
import { BtnSecondary } from '../buttons/btn-secondary/btn-secondary';

@Component({
  selector: 'app-empty-cart',
  imports: [BtnPrimary, BtnSecondary],
  templateUrl: './empty-cart.html',
  styleUrl: './empty-cart.css',
})
export class EmptyCart {}
