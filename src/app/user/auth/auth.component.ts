import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from "../user.model";
import { UsersService } from "../../shared/users.service";
import { AuthService } from "../../shared/auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  usersForm!: FormGroup;
  username = "";
  password = "";

  constructor(private usersService:UsersService,
              private authService : AuthService,
              private router:Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.usersForm = this.formBuilder.group({
      username : ['', Validators.required,],
      password : ['', Validators.required]
    });
  }

  onFormSubmit() {
    console.log(this.usersForm)
    if (this.usersForm) {
      const newUser:User = new User();
      newUser.username = this.username;
      newUser.password = this.password;

      // On utilise directement le service.
      // this.usersService.addUser(this.usersForm.value)
      //   .subscribe(response => {
      //     console.log(response.message);
      //     // On re-affiche la liste
      //     this.router.navigate(['/user-list']);
      this.authService.logIn(this.usersForm.value)
        .subscribe(response => {
          console.log(response);
          // On re-affiche la liste
          if(response.access_token){
            this.authService.loggedIn;
          }

          localStorage.setItem('access_token', response.access_token);
          console.log(localStorage.getItem('access_token'))
          this.router.navigate(['/home']);
        })
    }

  }
}
