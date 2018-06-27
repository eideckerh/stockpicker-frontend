import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {User} from "../../user/model/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  login(user: User) {
    if (user.username !== '' && user.password != '') {
      let headers = new HttpHeaders({
        'Authorization': 'Basic ' + btoa(user.username + ":" + user.password),
        'Content-Type': 'application/x-www-form-urlencoded'
      });
      console.log("performing request")
      this.http.get('http://localhost:8080/login', {headers: headers}).subscribe(
        result => {
          if (result) {
            this.loggedIn.next(true);
          }
        }
      )
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
