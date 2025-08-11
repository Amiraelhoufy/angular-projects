import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HardcodedAuthentication } from '../../service/authentication/hardcoded-authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [RouterModule, CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {

  constructor (private auth: HardcodedAuthentication, private router: Router){
  
  }

  public isUserLoggedIn(): boolean{

    return this.auth.isUserLoggedIn();
  }

  public handleLogout(){

    this.auth.logout();
    this.router.navigate(['login'], {queryParams: { loggedOut: true }});  // Pass optional flag to show alert
  

  }
}
