import { Injectable } from '@angular/core';
import {User} from "../user/user.model";
import { catchError, forkJoin, map, Observable, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;

  constructor(private http:HttpClient) { }
  url = "http://localhost:8080/api/login";

  // appelé quand on a rempli le formulaire login/password
  // devrait prendre en params le login et le pass
  // logIn() {
  //   this.loggedIn = true;
  // }
  logIn(user:User):Observable<any> {
    return this.http.post(this.url, user);
  }

  setLogin(){
    this.loggedIn = true;
  }
  // appelé par bouton de deconnexion
  logOut() {
    //this.loggedIn = false;
    localStorage.removeItem("access_token");
    this.loggedIn = false;
  }

  // vérification du rôle. Dans cet exemple simple on dit qu'on est admin
  // juste si on est loggué. Dans la vraie vie, il faudrait vérifier que le
  // login est bien égal à admin etc.
  isAdmin() {
    const isUserAdmin = new Promise((resolve, reject) => {
      // ici typiquement, on pourrait faire une requête
      // et donc ça prendrait du temps... c'est la raison
      // pour laquelle on renvoie une promesse....
        resolve(this.loggedIn);
    });

    return isUserAdmin;
  }

}
