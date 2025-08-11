import { HttpInterceptorFn } from '@angular/common/http';
import { BasicAuthenticationService } from '../../service/authentication/basic-auth.service';
import { inject } from '@angular/core';

// HttpInterceptorFn functional interceptors
export const basicAuthInterceptor: HttpInterceptorFn = (req, next) => {
  // const username = 'user';
  // const password = 'test';
  // const basicAuth = 'Basic ' + btoa(`${username}:${password}`); // Base64 encoding

  // const authReq = req.clone({
  //   headers: req.headers.set('Authorization', basicAuth),
  // });

  // return next(authReq);

  const authService = inject(BasicAuthenticationService);

  const token = authService.getAuthenticatedToken();
  const username = authService.getLoggedInUsername();

  let headers = req.headers;

  //Bearer Token header — for all other authenticated API calls after login.
  if (token && username) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  const authReq = req.clone({ headers });

  return next(req);
};
