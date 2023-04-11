import { Component, HostListener } from '@angular/core';
import { AuthService} from '../auth.service';
import { Router } from '@angular/router';
import {  OnInit } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isProfilePage=false;
  isScrolled = false;
  isLogin:boolean=false;
  constructor(public myService:AuthService, private router: Router){}
  ngOnInit():void {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        this.isProfilePage = (event.url === '/profile');
    });
  
    this.myService.userData.subscribe(()=>{
      if(this.myService.userData.getValue()!=null){
        this.isLogin=true;
      }
      else{
        this.isLogin=false;
      }
    })
  }
  logout(){
    this.myService.logout();
  }
  @HostListener("window:scroll")
  scrollEvent() {
      window.pageYOffset >= 50 ? (this.isScrolled = true) : (this.isScrolled = false);
  }
}
