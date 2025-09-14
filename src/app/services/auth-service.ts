import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { API_URLS } from '../constants/api_urls';
import { IAuthApi, IJwtPayload, ILogin, IRegister } from '../models/iauth-api';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  toastr = inject(ToastrService);
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  islogged$ = this.isLoggedInSubject.asObservable();
  private tokenKey = 'token';
  login(data: ILogin): Observable<IAuthApi> {
    return this.http.post<IAuthApi>(API_URLS.auth.login, data).pipe(
      tap((res) => {
        res.data ? localStorage.setItem(this.tokenKey, res.data.token) : '';
        this.isLoggedInSubject.next(true);
      }),
    );
  }
  register(data: IRegister): Observable<IAuthApi> {
    return this.http.post<IAuthApi>(API_URLS.auth.register, data);
  }
  logout() {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedInSubject.next(false);
    this.toastr.info('You have been logged out 👋', 'Logout');
    this.router.navigate(['/login']);
  }
  checkToken() {
    const token = localStorage.getItem(this.tokenKey);
    if (token && this.isTokenValid(token)) {
      this.isLoggedInSubject.next(true);
    } else {
      this.isLoggedInSubject.next(false);
      localStorage.removeItem(this.tokenKey);
    }
  }
  private isTokenValid(token: string): boolean {
    try {
      const decoded = jwtDecode<IJwtPayload>(token);
      const now = Date.now().valueOf() / 1000;
      return decoded.exp > now;
    } catch (e) {
      return false;
    }
  }

  getUserData() {
    const token = localStorage.getItem(this.tokenKey);
    if (token && this.isTokenValid(token)) {
      try {
        const decoded = jwtDecode<IJwtPayload>(token);
        return decoded.data;
      } catch (e) {
        return null;
      }
    }
    return null;
  }
}
