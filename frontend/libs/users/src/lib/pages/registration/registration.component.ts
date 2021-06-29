import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'users-registration',
  templateUrl: './registration.component.html',
  styles: [
  ]
})
export class RegistrationComponent implements OnInit {
  registrationFormGroup: FormGroup;
  isSubmitted = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private registration: RegistrationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initRegistrationForm();
  }

  private _initRegistrationForm() {
    this.registrationFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      shippingAddress: ['', Validators.required]
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.registrationForm.invalid) return;

    this.registration.registrate(
      this.registrationForm.name.value, 
      this.registrationForm.email.value, 
      this.registrationForm.password.value, 
      this.registrationForm.phone.value,
      this.registrationForm.shippingAddress.value)
      .subscribe ((user) => {
        window.alert(user.name + ", your profil is created!" );
        this.router.navigate(['/']);
      })
  }

  get registrationForm() {
    return this.registrationFormGroup.controls;
  }

}
