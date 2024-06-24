import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { LocalInterceptorFn } from './interceptors/local.fn';
import { HttpTrafficInterceptorFn } from './interceptors/http.fn';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatInputModule } from '@angular/material/input';

// FIXED: No provider for _HttpClient
export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(MatInputModule),
    provideRouter(
      routes,
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
        onSameUrlNavigation: 'reload',
      })
    ),
    provideHttpClient(
      withInterceptors([
        LocalInterceptorFn,
        HttpTrafficInterceptorFn,
      ])),
    provideAnimations(), provideAnimationsAsync(),
  ]
};
