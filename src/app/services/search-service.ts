import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchSubject = new BehaviorSubject<string>('');
  searchTerm$ = this.searchSubject.asObservable();
  setSearchTerm(str: string) {
    this.searchSubject.next(str);
  }
}
