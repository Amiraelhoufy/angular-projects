import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HardcodedAuthentication } from '../service/hardcoded-authentication';


@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {


  username = 'test';
  password = 'test';
  errorMessage = 'Invalid Credentials!';
  invalidLogin = false;

  invalidLoginMessage: string = 'Invalid credentials!';
  logoutMessage: string = '';

  //Dependency injection
  constructor(private router: Router,
    private activeRoute: ActivatedRoute,
    private auth: HardcodedAuthentication) {

  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      if (params['loggedOut']) {
        this.logoutMessage = 'You have been logged out.';
      }
    });
  }

  handleLogin() {
    // console.log('username:' + this.username);
    // console.log('password:' + this.password);
    
    this.invalidLogin = false;
    this.logoutMessage = '';

    const isAuthenticated = this.auth.authenticate(this.username, this.password);

    if (isAuthenticated) {
      // this.router.navigate(['welcome']);
      this.invalidLogin = false;
      this.router.navigate(['welcome', this.username]);
    } else {
      this.invalidLogin = true;
    }

  }
}
