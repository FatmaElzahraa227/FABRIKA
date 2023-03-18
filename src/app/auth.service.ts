import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router){
    if(localStorage.getItem('userToken')!=null){
      this.saveUserData();
    }
  }
  userData=new BehaviorSubject(null);

  saveUserData() {
    let encodedUserData = JSON.stringify(localStorage.getItem('userToken'));
    this.userData.next(jwtDecode(encodedUserData));
    
  }
  logout(){
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this.router.navigate(['/login']);
  }
}
