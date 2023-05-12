import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {
    if (localStorage.getItem('userToken') != null) {
      this.saveUserData();
    }
  }
  userData = new BehaviorSubject(null);

  saveUserData() {
    let encodedUserData = JSON.stringify(localStorage.getItem('userToken'));
    this.userData.next(jwtDecode(encodedUserData));
  }
  logout() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this.router.navigate(['/login']);
  }
  isUser(): boolean {
    let token = localStorage.getItem('userToken');
    if (token == null) {
      return true;
    } else {
      let role = localStorage.getItem('role');
      if (role == 'user') {
        return true;
      } else return false;
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
      //       return true;
      //     }
      //     else{return false;}
      //   });
      // return false;
    }
  }
  isAdmin(): boolean {
    let token = localStorage.getItem('userToken');

    let role = localStorage.getItem('role');
    if (role == 'admin') {
      return true;
    } else return false;
  }
  isLoggedIn(): boolean {
    let token = localStorage.getItem('userToken');
    if (token != null) {
      return true;
    } else {
      return false;
    }
  }
}
