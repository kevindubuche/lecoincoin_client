import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from "../user.model";
import { UsersService } from "../../shared/users.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  usersForm!: FormGroup;
  username = "";
  password = "";

  constructor(private usersService:UsersService,
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
      this.usersService.addUser(this.usersForm.value)
        .subscribe(response => {
          console.log(response.message);
          // On re-affiche la liste
          this.router.navigate(['/user-list']);
        })
    }

  }
}
