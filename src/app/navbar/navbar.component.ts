import { Component, HostListener } from '@angular/core';
import { AuthService} from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isScrolled = false;
  isLogin:boolean=false;
  constructor(public myService:AuthService){}
  ngOnInit():void {
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
