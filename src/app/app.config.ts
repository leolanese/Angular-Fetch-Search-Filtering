import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withRouterConfig } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { HttpTrafficInterceptorFn } from './interceptors/http.fn';
import { LocalInterceptorFn } from './interceptors/local.fn';

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
    provideAnimations(), 
    provideAnimationsAsync(),
  ]
};
