import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {AuthService} from "./auth/auth.service";

/**
 * HttpInterceptor, welcher alle HTTP Request abfängt und die passenden Authorisierungs-Header + die BasisUrl anhängt
 */
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {

  }

  /**
   * fängt alle HTTP Request abfängt ab und hängt die passenden Authorisierungs-Header + die BasisUrl an
   */
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
