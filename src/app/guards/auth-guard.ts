import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { map } from 'rxjs';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.islogged$.pipe(
    map((isLogged) => {
      if (!isLogged) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    }),
  );
};
