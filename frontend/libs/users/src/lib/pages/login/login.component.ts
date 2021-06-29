import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or Password are wrong';
  userEmail: string;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private usersService: UsersService,
    private localstorageService: LocalstorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginFormGroup.invalid) return;

    this.auth.login(this.loginForm.email.value, this.loginForm.password.value)
    .subscribe(
      (user) => {
        this.auth.user = user;

        this.authError = false;
        this.localstorageService.setToken(user.token);
        this.router.navigate(['/']);
        this.auth.logoutIsAuthenticatedStatus();

        this.usersService.getUserByEmail(this.loginForm.email.value)
        .subscribe(
          (user) => {
            this.userEmail = user.email;
            this.auth.user = {
              name: user.name,
              email: user.email,
              phone: user.phone,
              shippingAddress: user.shippingAddress
            };
          });


      },(error: HttpErrorResponse) => {
        this.authError = true;
        if (error.status !== 400) {
          this.authMessage = 'Error in the Server, please try again later!';
        }
      }
    );
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }
}
