import {Component, OnInit} from '@angular/core';
import {UserService} from "../../user/service/user.service";
import {User} from "../../user/model/user";
import {MatDialog, MatTableDataSource} from "@angular/material";
import {MessageboxComponent} from "../../core/messagebox/messagebox.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  displayedColumns: string[] = ['username', 'email', 'firstname', 'lastname', 'role', 'active', 'actions'];
  dataSource: MatTableDataSource<User>;

  constructor(private userService: UserService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.userService.getAll().subscribe(value => {
        this.dataSource = new MatTableDataSource<User>(value);
      },
      error => {
        this.dialog.open(MessageboxComponent, {data: {message: "Benutzer konnten nicht geladen werden: " + error.status}})
      })
  }

  onDeleteUser(user: User) {
    this.userService.delete(user.id).subscribe(res => {
        let item = this.dataSource.data.find(item => item.id === user.id);
        this.dataSource.data.splice(this.dataSource.data.indexOf(item), 1);
        this.dataSource = new MatTableDataSource<User>(this.dataSource.data);
      },
      error => {
        this.dialog.open(MessageboxComponent, {data: {message: "Benutzer konnten nicht gelöscht werden: " + error.status}})
      });
  }

  onToggleActive(user: User) {
    user.active = !user.active;
    this.updateUser(user);
  }


  onToggleRole(user: User) {
    if (this.isAdmin(user)) {
      user.role = 'USER';
    } else {
      user.role = 'ADMIN';
    }
    this.updateUser(user);
  }

  isAdmin(user: User): boolean {
    return user.role === 'ADMIN';
  }

  private updateUser(user: User) {
    this.userService.update(user).subscribe(res => {
      },
      error => {
        this.dialog.open(MessageboxComponent, {data: {message: "Benutzer konnten aktualisiert werden: " + error.status}})
      });
    this.dataSource.filter = "";
    //let item = this.dataSource.data.find(item => item.id === user.id);
    //this.dataSource.data.splice(this.dataSource.data.indexOf(item), 1, user);
    //this.dataSource = new MatTableDataSource<User>(this.dataSource.data);
  }

}


