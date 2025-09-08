import { Component, inject } from '@angular/core';
import { SearchService } from '../../services/search-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  private searchService = inject(SearchService);
  searchTerm: string = '';
  onSearch() {
    this.searchService.setSearchTerm(this.searchTerm);
  }
}
