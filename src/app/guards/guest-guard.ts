import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { map } from 'rxjs';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.islogged$.pipe(
    map((isLogged) => {
      if (isLogged) {
        router.navigate(['/']);
        return false;
      }
      return true;
    }),
  );
};
