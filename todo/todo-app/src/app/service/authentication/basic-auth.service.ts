import { catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { APIConstant } from '../../constants/api.constants';
import { AuthenticationBean } from '../../model/AuthenticationBean.model';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private httpClient: HttpClient) {}


authenticate(username: string, password: string): Observable<AuthenticationBean> {
// For the 1st (authenticate/ login) request: Don’t rely on the interceptor(credentials undefined).
// Pass credentials inline just for this request. Once the backend confirms authentication, store them.
// For all subsequent requests, the interceptor will handle it.

  const headers = {
    Authorization: 'Basic ' + btoa(`${username}:${password}`)
  };

  const body = {
    username: username,
    password: password
  };

  return this.httpClient
    .post<AuthenticationBean>(
      `${environment.API_URL}${APIConstant.Authentication.base}${APIConstant.Authentication.authenticate}`
        ,body  // body if your backend expects it
        ,{ headers }
    )
    .pipe(
        tap(response => {
      if (response.token) {
        this.setCredentials(username, response.token);
      } else {
        throw new Error('No token received');
      }
    }),
    catchError(error => {
      // Handle error (todo: return an observable with user-friendly error)
      console.error('Authentication failed', error);
      return throwError(() => error);
    }) 
  );
}


  setCredentials(username: string, token: string) {
  sessionStorage.setItem('authenticatedUser', username);
  sessionStorage.setItem('token', token);
  }


  isUserLoggedIn(): boolean {
    return !(sessionStorage.getItem('authenticatedUser') === null);

  }

  
  clearCredentials() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('authenticatedUser');
  }
  
  logout(): void {
    this.clearCredentials();
  }

  getLoggedInUsername(): string | null{
    return this.isUserLoggedIn()? sessionStorage.getItem('authenticatedUser'): null;
  }

  
  getAuthenticatedToken(): string | null{
    return this.isUserLoggedIn()? sessionStorage.getItem('token'): null;
  }
}

