import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
// import { basicAuthInterceptor } from './core/interceptors/basicAuthInterceptor.interceptor';
import { jwtAuthInterceptor } from './core/interceptors/jwtAuthInterceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    // provideHttpClient(withInterceptors([basicAuthInterceptor])),
    provideHttpClient(withInterceptors([jwtAuthInterceptor]))
  ]
};
