import { Component } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
isLogin:boolean = false;
constructor(public myService: AuthService){}
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
}
