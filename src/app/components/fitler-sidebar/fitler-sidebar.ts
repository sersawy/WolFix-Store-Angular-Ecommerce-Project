import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { IItems } from '../../models/iproducts-api';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fitler-sidebar',
  imports: [FormsModule],
  templateUrl: './fitler-sidebar.html',
  styleUrl: './fitler-sidebar.css',
})
export class FitlerSidebar implements OnChanges {
  @Input() categories: IItems = {} as IItems;
  @Input() brands: IItems = {} as IItems;
  filteredCategories = this.categories.items;
  filteredBrands = this.brands.items;

  @Input() minPrice!: number;
  @Input() maxPrice!: number;
  initial: boolean = false;
  initialMinPrice!: number;
  initialMaxPrice!: number;
  @Output() filtersChanged = new EventEmitter<any>();
  filters: any = {
    minPrice: '',
    maxPrice: '',
    rating: 0,
    categories: [] as string[],
    brands: [] as string[],
    availability: 'all',
  };
  toggleArrayValue(arrayName: 'categories' | 'brands', value: string, checked: boolean) {
    const arr = this.filters[arrayName];
    if (checked) {
      if (!arr.includes(value)) {
        arr.push(value);
      }
    } else {
      this.filters[arrayName] = arr.filter((v: string) => v !== value);
    }
    this.onFiltersChange();
  }
  onFiltersChange() {
    this.filtersChanged.emit(this.filters);
  }
  ngOnChanges(): void {
    if (this.filters.maxPrice <= this.filters.minPrice)
      this.filters.minPrice = this.filters.maxPrice + 1;
    if (this.filters.minPrice >= this.filters.maxPrice)
      this.filters.maxPrice = this.filters.minPrice + 1;
    if (!this.initial && this.minPrice && this.maxPrice) this.setInitial();
  }
  setInitial(): void {
    this.initial = true;
    this.filteredCategories = this.categories.items;
    this.filteredBrands = this.brands.items;
    this.filters.minPrice = this.minPrice;
    this.filters.maxPrice = this.maxPrice;
    this.initialMinPrice = this.minPrice;
    this.initialMaxPrice = this.maxPrice;
  }
  onCategorySearch(term: string) {
    this.filteredCategories = this.categories.items.filter((item) =>
      item.toLowerCase().includes(term.toLowerCase())
    );
  }

  onBrandSearch(term: string) {
    this.filteredBrands = this.brands.items.filter((item) =>
      item.toLowerCase().includes(term.toLowerCase())
    );
  }
  resetFilter() {
    this.filters = {
      minPrice: this.initialMinPrice,
      maxPrice: this.initialMaxPrice,
      rating: 0,
      categories: [],
      brands: [],
      availability: 'all',
    };

    this.filteredCategories = this.categories.items;
    this.filteredBrands = this.brands.items;

    this.onFiltersChange();
  }
}
