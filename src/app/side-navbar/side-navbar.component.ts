import { Component } from '@angular/core';


import { AuthService } from '../auth.service';

@Component({ 
  selector: 'app-sidenav',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss'],
 
})
export class SideNavbarComponent{
  constructor(
    public myService: AuthService,
  ) {}

  logout() {
    this.myService.logout();
  }

}