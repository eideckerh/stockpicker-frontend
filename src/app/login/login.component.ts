import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../core/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.minLength(4)],
      password: ['', Validators.minLength(6)]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value);
      if (this.authService.getLoggedInUser.subscribe(value => {
        if (value) {
          this.router.navigate(['/']);
        }
      }))
        this.formSubmitAttempt = true;
      this.form.controls['username'].setErrors({'incorrect': true});
      this.form.controls['password'].setErrors({'incorrect': true});
    }
  }
}
