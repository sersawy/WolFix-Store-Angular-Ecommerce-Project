import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Material from '@primeuix/themes/material';
import Nora from '@primeuix/themes/nora';
import { provideAppInitializer } from '@angular/core';
import { AuthService } from './services/auth-service';
import { authInterceptor } from './interceptors/auth-interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: { preset: Aura },
      // theme: { preset: Aura, options: { darkModeSelector: '.p-dark' } },
    }),
    provideAnimations(), // required animations providers
    provideToastr({
      positionClass: 'toast-bottom-right',
      closeButton: true,
      // preventDuplicates: true,
      // countDuplicates: true,
    }),
    provideAppInitializer(() => {
      const auth = inject(AuthService);
      return auth.checkToken();
    }),
  ],
};
