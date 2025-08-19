import { HttpInterceptorFn } from '@angular/common/http';
import { BasicAuthenticationService } from '../../service/authentication/basic-auth.service';
import { inject } from '@angular/core';

// HttpInterceptorFn functional interceptors
export const basicAuthInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(BasicAuthenticationService);

  const token = authService.getAuthToken(); // stored "Basic <encoded>" at login

  // Avoid attaching token to login endpoint
  if (token && !req.url.includes('/authenticate')) {
    req = req.clone({
      headers: req.headers.set('Authorization', token),
    });
  }

  return next(req);

};
