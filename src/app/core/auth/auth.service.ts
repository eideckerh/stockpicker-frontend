import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {User} from "../../user/model/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {map} from "rxjs/operators";

/**
 * Service für die Authentifizierung von Benutzern
 */
@Injectable()
export class AuthService {
  private loggedInUser = new BehaviorSubject<User>(undefined);

  /**
   * Gibt ein Observable auf den aktuell eingeloggten Benutzer zurück.
   * @returns {Observable<User>}
   */
  get getLoggedInUser() {
    return this.loggedInUser.asObservable();
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  /**
   * Servicecall für die Registrierung eines neuen Benutzers
   * @param {User} user
   * @returns {Observable<User>}
   */
  register(user: User): Observable<User> {
    return this.http.post('/register', user).pipe(map((res: User) => {
      return res;
    }))
    //.map((res: Response) => res.status == 204
  }

  /**
   * Servicecall um den aktuellen Kontostand eines Benutzers abzufragen
   * @returns {Observable<number>}
   */
  getBalance(): Observable<number> {
    return this.http.get('/account/balance').pipe(
      map((value: number) => value)
    )
  }

  /**
   * Servicecall um einen Benutzer mit den übergebenen Credentials einzuloggen
   * @param {User} user
   */
  login(user: User) {
    if (user.username !== '' && user.password != '') {
      let headers = new HttpHeaders({
        'Authorization': 'Basic ' + btoa(user.username + ":" + user.password),
        'Content-Type': 'application/x-www-form-urlencoded'
      });
      this.http.get('/login', {headers: headers}).subscribe(
        (result: User) => {
          if (result) {
            console.log("Symbol " + result.username + " with role " + result.role + " logged in.")

            result.password = user.password;
            this.loggedInUser.next(result);
          }
        }
      )
    }
  }

  /**
   * Logout des Benutzers
   */
  logout() {
    this.loggedInUser.next(undefined);
    this.router.navigate(['/login']);
  }
}
