import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({ 
  selector: 'app-sidenav',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss'],
 
})
export class SideNavbarComponent{
  addVehicleLinkActive = false;
  editVehicleLinkActive = false;
  reportsLinkActive = false;
  mydashboardLinkActive = false;

  fName=localStorage.getItem('fName');
  lName=localStorage.getItem('lName');

  constructor( public myService: AuthService,private router: Router) {
    // Subscribe to router events to detect when the route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check if the "Add vehicle" link is active
        this.addVehicleLinkActive = this.router.isActive('/addvehicle', true);
        this.editVehicleLinkActive = this.router.isActive('/editvehicle', true);
        this.reportsLinkActive = this.router.isActive('/reports', true);
        this.mydashboardLinkActive = this.router.isActive('/mydashboard', true);
      }
    });}
 

  logout() {
    this.myService.logout();
  }

}