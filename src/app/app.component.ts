import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titre = "lecoincoin";

  constructor(private authService:AuthService, private router:Router) {}

  login() {
    if(!this.authService.loggedIn) {
      //this.authService.logIn();
    } else {
      this.authService.logOut();
      this.router.navigate(["/home"]);
    }
  }

  isLoggedIn():boolean {
    return localStorage.getItem('access_token') != null ;
    // if (res != null ){
    //   return true;
    // }
    //   return false;
  }
  logout() {
     this.authService.logOut();
  }
}
