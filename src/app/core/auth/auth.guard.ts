import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.getLoggedInUser
      .pipe(take(1))
      .pipe(map(user => {
        if (!user) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      }));
  }
}
