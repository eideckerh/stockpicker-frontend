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
      this.loggedIn.next(true);
      let headers = new HttpHeaders();
      headers.append("Authorization", "Basic " + btoa(user.username + ":" + user.password));
      headers.append("Content-Type", "application/x-www-form-urlencoded");
      let body = JSON.stringify({username: user.username, password: user.password})
      console.log("performing request")
      this.http.post('http://localhost:8080/login', body, {headers: headers}).subscribe(
        result => console.log("test " + result.toString())
      )
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
