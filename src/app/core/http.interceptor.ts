import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
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
        let headers: HttpHeaders = req.headers.append(
          'Authorization', 'Basic ' + btoa(user.username + ":" + user.password));
        req = req.clone({
          headers: headers
        })
      }
    })

    return next.handle(req);
  }
}
