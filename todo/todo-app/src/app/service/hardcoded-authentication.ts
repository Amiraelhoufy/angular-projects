import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthentication {

  authenticate(username: string, password: string): boolean {

    // console.log('before: ' + this.isUserLoggedIn());
    if (username === 'test' && password === 'test') {
      sessionStorage.setItem('authenticatedUser', username);

      // console.log('aft9+er: ' + this.isUserLoggedIn());
      return true;
    } else {
      return false;
    }

  }

  isUserLoggedIn(): boolean {
    return !(sessionStorage.getItem('authenticatedUser') === null);

  }

  logout(){
    sessionStorage.removeItem('authenticatedUser');
  }

}

