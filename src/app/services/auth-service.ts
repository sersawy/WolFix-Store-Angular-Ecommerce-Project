import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { API_URLS } from '../constants/api_urls';
import { IAuthApi, IJwtPayload, ILogin } from '../models/iauth-api';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  islogged$ = this.isLoggedInSubject.asObservable();
  private tokenKey = 'token';
  login(data: ILogin): Observable<IAuthApi> {
    return this.http.post<IAuthApi>(API_URLS.auth.login, data).pipe(
      tap((res) => {
        res.data ? localStorage.setItem(this.tokenKey, res.data.token) : '';
        this.isLoggedInSubject.next(true);
        this.router.navigate(['/']);
      })
    );
  }
  register(email: string, password: string): Observable<IAuthApi> {
    return this.http
      .post<IAuthApi>(API_URLS.auth.register, { email, password })
      .pipe(tap(() => this.router.navigate(['/'])));
  }
  logout() {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedInSubject.next(false);
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
