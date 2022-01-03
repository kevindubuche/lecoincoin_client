import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, tap } from 'rxjs';
import { LoggingService } from './logging.service';
import { User} from "../user/user.model";
import {Assignment} from "../assignments/assignment.model";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'text/json',
    'Access-Control-Allow-Origin':'*',
    'Authorization':'Bearer '
  })
};

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  assignments: User[] = [];

  constructor(private http:HttpClient) { }
  url = "http://localhost:8080/api/users";

  getUsers():Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getUsersPagine(page:number, limit:number):Observable<any> {
  return this.http.get<User[]>(`${this.url}`);
  }

  addUser(user:User):Observable<any> {
    console.log("___________ADD USER IS CALLED_______________");
    return this.http.post(this.url, user, httpOptions);
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    }
  };

  getUser(id:number):Observable<User|undefined> {
    return this.http.get<User>(this.url + "/" + id)
      .pipe(
        map(a => {
          return a;
        }),
        tap(a => {
          console.log("Tap : reçu user de nom = " + a.username);
        }),
        catchError(this.handleError<any>('### catchError: getUser by id avec id=' + id))
      );
  }
  updateUser(user:User):Observable<any> {
    console.log( user);
    return this.http.put<User>(`${this.url}/${user.id}`, user);
  }

  deleteUser(user:User) :Observable<any>{
    return this.http.delete(this.url + "/" + user.id);
  }


}
