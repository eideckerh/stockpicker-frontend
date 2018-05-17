import {Component, OnInit, ɵQueryBindingType} from '@angular/core';
import {AuthService} from "../core/auth/auth.service";
import {Observable} from "rxjs/internal/Observable";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isLoggedIn: Observable<boolean>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  onLogout() {
      this.authService.logout();
  }

}
