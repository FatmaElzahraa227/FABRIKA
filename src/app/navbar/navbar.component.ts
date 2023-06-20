import { Component, HostListener } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  show = false;
  isProfilePage = false;
  isLoginPage = false;
  isSignupPage = false;
  isScrolled = false;
  isLogin: boolean = false;
  constructor(
    public myService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isProfilePage = event.url === '/profile';
        this.isLoginPage = event.url === '/login';
        this.isSignupPage = event.url === '/signup';
      });
 
      

    this.myService.userData.subscribe(() => {
      if (this.myService.userData.getValue() != null) {
        this.isLogin = true;
        
        setTimeout(() => {
          let role = localStorage.getItem('role');
      
          if (role != 'admin') {
            this.show = true;
          } else {
            this.show = false;
          }
        }, 600);
      } else {
        this.isLogin = false;
        this.show = true;
      }
    });
  }
  logout() {
    this.myService.logout();
    
  }
  @HostListener('window:scroll')
  scrollEvent() {
    window.pageYOffset >= 50
      ? (this.isScrolled = true)
      : (this.isScrolled = false);
    
  }
}
