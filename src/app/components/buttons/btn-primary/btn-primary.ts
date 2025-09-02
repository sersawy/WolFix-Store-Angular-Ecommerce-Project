import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-btn-primary',
  imports: [RouterLink],
  // templateUrl: './btn-primary.html',
  template: `<a class="btn btn-primary" [routerLink]="routerLink">{{ text }}</a>`,
  styleUrl: './btn-primary.css',
})
export class BtnPrimary {
  @Input() routerLink: string = '#';
  @Input() text: string = '';
}
