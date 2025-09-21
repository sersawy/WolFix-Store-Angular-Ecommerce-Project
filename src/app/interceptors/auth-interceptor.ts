import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const spinner = inject(NgxSpinnerService);
  spinner.show();
  authService.checkToken();
  const token = localStorage.getItem('token');
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req).pipe(finalize(() => spinner.hide()));
};
