import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-btn-secondary',
  imports: [RouterLink],
  // templateUrl: './btn-secondary.html',
  template: `<a class="btn btn-secondary" [routerLink]="routerLink" [innerHTML]="content"></a>`,
  styleUrl: './btn-secondary.css',
})
export class BtnSecondary {
  @Input() routerLink: string = '#';
  @Input() content: string = '';
}
