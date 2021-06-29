import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Subject } from "rxjs";
import { User } from '../models/user';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURLUsers = environment.apiUrl + 'users';

  public isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  user: User;

  constructor(
    private http: HttpClient,
    private token: LocalstorageService,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiURLUsers}/login`, { email, password });
  }

  logoutIsAuthenticatedStatus() {
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
    this.token.removeToken();
    this.router.navigate(['/login']);
    this.user = new User();
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
}