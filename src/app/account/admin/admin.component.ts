import {Component, OnInit} from '@angular/core';
import {UserService} from "../../user/service/user.service";
import {User} from "../../user/model/user";
import {MatDialog} from "@angular/material";
import {MessageboxComponent} from "../../core/messagebox/messagebox.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  displayedColumns: string[] = ['username', 'email', 'firstname', 'lastname', 'role', 'actions'];
  dataSource: User[];

  constructor(private userService: UserService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.userService.getAll().subscribe(value => {
        this.dataSource = value;
      },
      error => {
        this.dialog.open(MessageboxComponent, {data: {message: "Benutzer konnten nicht geladen werden: " + error.status}})
      })
  }


}


