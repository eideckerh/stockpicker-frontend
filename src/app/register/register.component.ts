import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {AuthService} from "../core/auth/auth.service";
import {MatDialog} from "@angular/material";
import {MessageboxComponent} from "../core/messagebox/messagebox.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstname: ['', Validators.minLength(4)],
      lastname: ['', Validators.minLength(4)],
      username: ['', Validators.minLength(4)],
      email: ['', Validators.email],
      password: ['', Validators.minLength(6)]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.register(this.form.value).subscribe(value => {
        if (value) {
          this.dialog.open(MessageboxComponent, {data: {message: "Registrierung war erfolgreich"}})
        }
      }, error => {
        console.log(error);
        this.dialog.open(MessageboxComponent, {data: {message: "Registrierung nicht erfolgreich. Benutzername oder E-Mail ist bereits vorhanden."}})
      });
    }
  }

  onCancel() {
    this.router.navigate(['/login'])
  }
}
