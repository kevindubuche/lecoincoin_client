import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from "../user.model";
import {UsersService} from "../../shared/users.service";
import {Assignment} from "../../assignments/assignment.model";
import {AssignmentsService} from "../../shared/assignments.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  usersForm!: FormGroup;
  user!: User | undefined;
  username: string | undefined = "";
  password: string | undefined = "";

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    console.log("-----------")
    // Récupération des queryParams et fragment (ce qui suit le ? et le # dans l'URL)
    console.log("Query Params :");
    console.log(this.route.snapshot.queryParams);
    console.log("Fragment d'URL (ce qui suit le #) :");
    console.log(this.route.snapshot.fragment);
    console.log("-----------")

    this.getUser();
    this.usersForm = this.formBuilder.group({
      title : ['', Validators.required,],
      description : ['', Validators.required],
      status : ['', Validators.required],
      price : ['', Validators.required]
    });
  }

  getUser() {
    // on récupère l'id dans le snapshot passé par le routeur
    // le "+" force l'id de type string en "number"
    const id = +this.route.snapshot.params['id'];
    this.userService
      .getUser(id)
      .subscribe((user) => {
        this.user = user;

        this.username = user?.username;
        this.password = user?.password;
      });
  }

  onSaveUser() {
    if (!this.user) return;

    if (this.username) {
      this.user.username = this.username;
    }

    if (this.password) {
      this.user.password = this.password;
    }
    this.userService
      .updateUser(this.user)
      .subscribe(reponse => {
        console.log(reponse.message);

        // navigation vers la home page
        this.router.navigate(['/user-list']);
      });
  }

}
