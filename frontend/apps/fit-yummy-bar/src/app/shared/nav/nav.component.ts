import { Component, OnInit } from '@angular/core';

import { AuthService } from "../../../../../../libs/users/src/lib/services/auth.service";

@Component({
  selector: 'fit-yummy-bar-nav',
  templateUrl: './nav.component.html',
  styles: [
  ]
})
export class NavComponent implements OnInit {

  constructor(public authService: AuthService) {}

  ngOnInit() { }

  onLogout() {
    this.authService.logout();
  }

}
