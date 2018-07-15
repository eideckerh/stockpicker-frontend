import {Component, OnInit, ViewChild} from "@angular/core";
import {UserService} from "../../user/service/user.service";
import {User} from "../../user/model/user";
import {MatDialog, MatSelectChange, MatTable, MatTableDataSource} from "@angular/material";
import {MessageboxComponent} from "../../core/messagebox/messagebox.component";


/**
 * Komponente für eine Tabellenübersicht über alle vorhandenen Benutzer und deren verwaltung.
 */
@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {

  displayedColumns: string[] = ["username", "email", "firstname", "lastname", "role", "active", "actions"];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatTable) table: MatTable<any>;

  constructor(private userService: UserService, private dialog: MatDialog) {
  }


  /**
   * Initialisiert die Komponente mit Daten (Service-Call an das Backend)
   */
  ngOnInit() {
    this.userService.getAll().subscribe(value => {
        this.dataSource = new MatTableDataSource<User>(value);
      },
      error => {
        this.dialog.open(MessageboxComponent, {data: {message: "Benutzer konnten nicht geladen werden: " + error.status}});
      });
  }

  /**
   * Löschlogik für das onDelete Event. Backend-Call zum löschen wird aufgerufen
   * @param {User} user
   */
  onDeleteUser(user: User) {
    this.userService.delete(user.id).subscribe(res => {
        let item = this.dataSource.data.find(item => item.id === user.id);
        this.dataSource.data.splice(this.dataSource.data.indexOf(item), 1);
        this.dataSource = new MatTableDataSource<User>(this.dataSource.data);
      },
      error => {
        this.dialog.open(MessageboxComponent, {data: {message: "Benutzer konnten nicht gelöscht werden: " + error.status}});
      });
  }

  /**
   * Aktiviert einen Benutzer und sendent einen Backendcall um den Benutzer zu aktualisieren
   * @param {MatSelectChange} event
   * @param {User} source
   */
  onToggleActive(event: MatSelectChange, source: User) {
    source.active = event.value;
    this.updateUser(source);
  }

  /**
   * Ändert die Rolle eines Benutzers und sendet einen BackendCall um den Benutzer zu aktualisieren
   * @param {MatSelectChange} event
   * @param {User} source
   */
  onToggleRole(event: MatSelectChange, source: User) {
    source.role = (event.value);
    this.updateUser(source);
  }

  /**
   * Prüft ob der übergebene Benutzer die Rolle ADMIN hat
   * @param {User} user
   * @returns {boolean}
   */
  isAdmin(user: User): boolean {
    return user.role === "ADMIN";
  }

  private updateUser(user: User) {
    this.userService.update(user).subscribe(res => {
        console.log("updated user: " + user.username + " " + user.active + " " + user.role);
        this.table.renderRows();
      },
      error => {
        this.dialog.open(MessageboxComponent, {data: {message: "Benutzer konnten aktualisiert werden: " + error.status}});
      });
  }

}


