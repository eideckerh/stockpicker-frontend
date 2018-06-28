import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {AuthService} from "./auth/auth.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = 'http://localhost:8080';
    req = req.clone({
      url: url + req.url
    });
    this.authService.getLoggedInUser.subscribe(user => {
      if (user) {
        req = req.clone({
          setHeaders: {
            'Authorization': 'Basic ' + btoa(user.username + ":" + user.password),
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
      }
    })

    return next.handle(req);
  }
}
