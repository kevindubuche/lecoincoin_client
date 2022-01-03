import { Component,  EventEmitter, OnInit, Output  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { User } from "../user.model";
import { UsersService } from "../../shared/users.service";


@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {

  userTransmis?: User;
  @Output() deleteUser = new EventEmitter<User>();


  constructor(
    private usersService: UsersService,
    private authService:AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    // On récupère l'id dans l'URL
    const id: number = this.route.snapshot.params['id'];

    console.log('COMPOSANT DETAIL id = ' + id);

    this.usersService.getUser(id).subscribe((user) => {
      this.userTransmis = user;
    });
  }

  onDelete() {
    if (this.userTransmis) {
      this.usersService
        .deleteUser(this.userTransmis)
        .subscribe((message) => {
          console.log(message);
          // Pour cacher l'affichage du détail (ne change pas la
          // valeur de l'user dans le tableau)
          this.userTransmis = undefined;

          // On re-affiche la liste
          this.router.navigate(['/home']);
        });
    }
  }

  onClickEdit() {
    if(this.userTransmis) {
      // Exemple de navigation vers http://.../user/3/edit?nom=Devoir_Buffa&date:31_12...#edition
      this.router.navigate(['/user', this.userTransmis.id, 'edit'],
        {
          queryParams: {
            username: this.userTransmis.username,
            password : this.userTransmis.password
          },
          fragment : 'edition'
        });
    }
  }

  isAdmin():boolean {
    return this.authService.loggedIn;
  }


}
