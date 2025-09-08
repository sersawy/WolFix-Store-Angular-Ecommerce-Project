import { CartService } from './../../services/cart-service';
import { Component, inject } from '@angular/core';
import { BtnPrimary } from '../buttons/btn-primary/btn-primary';
import { BtnSecondary } from '../buttons/btn-secondary/btn-secondary';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search-service';
import { SearchBar } from '../search-bar/search-bar';

@Component({
  selector: 'app-header',
  imports: [BtnPrimary, BtnSecondary, RouterLink, FormsModule, SearchBar],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  public cartService = inject(CartService);
  private searchService = inject(SearchService);
  searchTerm: string = '';
  onSearch() {
    this.searchService.setSearchTerm(this.searchTerm);
  }
}
