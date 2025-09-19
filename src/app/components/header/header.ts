import { CartService } from './../../services/cart-service';
import { Component, inject, OnInit } from '@angular/core';
import { BtnPrimary } from '../buttons/btn-primary/btn-primary';
import { BtnSecondary } from '../buttons/btn-secondary/btn-secondary';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search-service';
import { SearchBar } from '../search-bar/search-bar';
import { AuthService } from '../../services/auth-service';
import { IUser } from '../../models/iauth-api';

@Component({
  selector: 'app-header',
  imports: [BtnPrimary, BtnSecondary, RouterLink, FormsModule, SearchBar, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  public cartService = inject(CartService);
  private searchService = inject(SearchService);
  authService = inject(AuthService);
  user: IUser = {} as IUser;
  searchTerm: string = '';
  islogged: boolean = false;
  searchStatus: boolean = false;
  onSearch() {
    this.searchService.setSearchTerm(this.searchTerm);
  }
  ngOnInit(): void {
    this.authService.islogged$.subscribe((data) => {
      this.islogged = data;
      if (this.islogged) this.getUser();
    });
    this.searchService.searchStatus$.subscribe((data) => (this.searchStatus = data));
  }
  getUser() {
    const data = this.authService.getUserData();
    if (!data) return;
    this.user = data;
  }
}
