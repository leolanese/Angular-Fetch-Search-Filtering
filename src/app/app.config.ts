import { ApplicationConfig } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { LocalInterceptorFn } from './interceptors/local.fn';
import { HttpTrafficInterceptorFn } from './interceptors/http.fn';

// FIXED: No provider for _HttpClient
export const appConfig: ApplicationConfig = {
  providers: [
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
    provideAnimations(),
  ]
};
