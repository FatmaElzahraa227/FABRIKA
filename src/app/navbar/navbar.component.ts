import { Component, HostListener } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  show = false;
  isProfilePage = false;
  isScrolled = false;
  isLogin: boolean = false;
  constructor(
    public myService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isProfilePage = event.url === '/profile';
      });

    this.myService.userData.subscribe(() => {
      if (this.myService.userData.getValue() != null) {
        this.isLogin = true;
        let role = localStorage.getItem('role');
        if (role != 'admin') {
          this.show = true;
        } else {
          this.show = false;
        }
        // let token = localStorage.getItem('userToken');
        // const headers = new HttpHeaders({
        //   'Content-Type': 'application/json',
        //   Authorization: `Bearer ${token}`,
        // });
        // this.http
        //   .get<any>('http://fabrika-env.eba-p22tzwhg.eu-north-1.elasticbeanstalk.com/api/v1/user/getProfile/', { headers: headers })
        //   .subscribe((response) => {
        //     const data = response;
        //     console.log(data);
        //     if(data.userData.role=='user'){
        //       this.show=true;
        //     }
        //     else{this.show=false;}
        //   });
      } else {
        this.isLogin = false;
        this.show = true;
      }
    });
  }
  logout() {
    this.myService.logout();
    console.log('fdd');
    
  }
  @HostListener('window:scroll')
  scrollEvent() {
    window.pageYOffset >= 50
      ? (this.isScrolled = true)
      : (this.isScrolled = false);
  }
}
