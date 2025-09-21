import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-btn-primary',
  imports: [RouterLink],
  // templateUrl: './btn-primary.html',
  template: `@if (routerLink) {
      <a class="btn btn-primary" [routerLink]="routerLink" [innerHTML]="content"></a>
    } @else {
      <button class="btn btn-primary" [innerHTML]="content"></button>
    }`,
  styleUrl: './btn-primary.css',
})
export class BtnPrimary {
  @Input() routerLink: string = '';
  @Input() content: string = '';
}
