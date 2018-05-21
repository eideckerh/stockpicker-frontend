import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstname: [null, Validators.required, Validators.minLength(4)],
      lastname: [null, Validators.required, Validators.minLength(4)],

      username: [null, Validators.required, Validators.minLength(4)],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required, Validators.minLength(6)],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      /*this.authService.login(this.form.value);
      this.formSubmitAttempt = true;*/
    }
  }

  onCancel() {
    this.router.navigate(['/login'])
  }
}
