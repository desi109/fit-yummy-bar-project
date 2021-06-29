import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { User } from '../models/userregistration';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  apiURLUsers = environment.apiUrl + 'users';

  constructor(
    private http: HttpClient,
    private token: LocalstorageService,
    private router: Router
  ) {}

  registrate(name: string, email: string, password: string, phone: string, shippingAddress: String): Observable<User> {
    return this.http.post<User>(`${this.apiURLUsers}/registration`, { name, email, password, phone, shippingAddress });
  }
}
