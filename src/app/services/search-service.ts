import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchSubject = new BehaviorSubject<string>('');
  private searchStatus = new BehaviorSubject<boolean>(false);
  searchTerm$ = this.searchSubject.asObservable();
  searchStatus$ = this.searchStatus.asObservable();
  setSearchTerm(str: string) {
    this.searchSubject.next(str);
  }
  show() {
    this.searchStatus.next(true);
  }
  hide() {
    this.searchStatus.next(false);
  }
}
