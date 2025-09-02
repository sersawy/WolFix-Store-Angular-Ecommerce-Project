import { Component } from '@angular/core';
import { BtnPrimary } from '../buttons/btn-primary/btn-primary';
import { BtnSecondary } from '../buttons/btn-secondary/btn-secondary';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [BtnPrimary, BtnSecondary, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
