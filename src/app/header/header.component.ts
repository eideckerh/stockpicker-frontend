import {Component, OnInit} from '@angular/core';
import {AuthService} from "../core/auth/auth.service";

/**
 * Komponente für die Navigationsleiste der Anwendung
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isLoggedIn: boolean;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.getLoggedInUser.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  onLogout() {
    this.authService.logout();
  }

}
