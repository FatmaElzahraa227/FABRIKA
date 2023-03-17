import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isScrolled = false;
  
  @HostListener("window:scroll")
  scrollEvent() {
      window.pageYOffset >= 50 ? (this.isScrolled = true) : (this.isScrolled = false);
  }
}
