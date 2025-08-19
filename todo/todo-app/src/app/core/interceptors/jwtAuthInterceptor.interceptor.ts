import { inject } from '@angular/core';
import { JwtAuthenticationService } from './../../service/authentication/jwt-auth.service';
import { HttpInterceptorFn } from "@angular/common/http";

// For the 1st (authenticate/ login) request: Don’t rely on the interceptor(credentials undefined).
// Pass credentials inline just for this request. Once the backend confirms authentication, store them.
// For all subsequent requests, the interceptor will handle it.

export const jwtAuthInterceptor: HttpInterceptorFn = (req, next) => {

    const authService = inject(JwtAuthenticationService);

    console.log('Interceptor');
    const token = authService.getAuthToken();
    const username = authService.getLoggedInUsername();

    let headers = req.headers;

  //Bearer Token header — for all other authenticated API calls after login.
  if (token && username) {
      headers = headers.set('Authorization', token);
      
    // console.log('Interceptor Token!' + token);
  }


  const authReq = req.clone({ headers });
  return next(authReq);
};
