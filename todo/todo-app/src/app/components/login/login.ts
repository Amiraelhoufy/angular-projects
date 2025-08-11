import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HardcodedAuthentication } from '../../service/authentication/hardcoded-authentication.service';
import { BasicAuthenticationService } from '../../service/authentication/basic-auth.service';


@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  username = '';
  password = '';
  errorMessage = 'Invalid Credentials!';
  invalidLogin = false;

  invalidLoginMessage: string = 'Invalid credentials!';
  logoutMessage: string = '';

  //Dependency injection
  constructor(private router: Router,
    private activeRoute: ActivatedRoute,
    // private auth: HardcodedAuthentication
    private auth: BasicAuthenticationService
  ) {

  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      if (params['loggedOut']) {
        this.logoutMessage = 'You have been logged out.';
      }
    });
  }

  // Authentication through backend
    handleBasicAuthLogin() {

    this.invalidLogin = false;
    this.logoutMessage = '';

    const isAuthenticated = this.auth.authenticate(this.username, this.password)
    .subscribe({
        next: (response) => {
          console.log(response);
          this.invalidLogin = false;
          this.router.navigate(['welcome', this.username]);
        },
        error: (error) => {
          console.log(error); 
          this.invalidLogin = true;
        },
        complete: () => console.log('Request to login completed'),
      });

  }

  // Hardcoded Authentication
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
