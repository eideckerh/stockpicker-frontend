import {Component, OnInit} from '@angular/core';
import {AuthService} from "../core/auth/auth.service";
import {User} from "../user/model/user";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: User = new User();

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.getLoggedInUser.subscribe((user: User) => {
      this.user = user;
    });
  }

}
