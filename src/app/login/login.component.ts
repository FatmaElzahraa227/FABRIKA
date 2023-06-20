import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  showPreloader = false;
  public loginForm!: FormGroup;

  url: string = 'http://localhost:5000/api/v1/auth/signIn/';
  url2: string = 'http://localhost:5000/api/v1/user/getProfile';
  // url: string =
  //   'http://fabrika-env.eba-p22tzwhg.eu-north-1.elasticbeanstalk.com/api/v1/auth/signIn/';
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public myService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  st: any;
  errorMessageEmail: String = '';
  errorMessagePassword: String = '';
  errorMessageRegister: String = '';

  login() {
    this.st = this.loginForm.value;
    console.log(this.st);
    return this.http.post<any>(this.url, this.st).subscribe(
      (st) => {
        if (st.err) {
          console.log(st.err);
          if (
            st.err[0][0].message == '"email" is not allowed to be empty' ||
            st.err[0][0].message == '"email" must be a valid email'
          ) {
            this.errorMessageEmail = 'Please enter a valid email';
            this.errorMessagePassword = '';
            this.errorMessageRegister = '';
          } else if (
            st.err[0][0].message == '"password" is not allowed to be empty'
          ) {
            this.errorMessageEmail = '';
            this.errorMessagePassword = 'Please type your password,';
            this.errorMessageRegister = '';
          }
        } else {
          console.log('success', st.token);
          this.showPreloader = true;
          this.loginForm.reset();
          localStorage.setItem('userToken', st.token);
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${st.token}`,
          });
          this.http
            .get<any>(
              this.url2,
              { headers: headers }
            )
            .subscribe((response) => {
              const data = response;
              console.log(data.userData.role);
              localStorage.setItem("userID",data.userData._id)
              // console.log(data.userData._id);
              localStorage.setItem('userEmail', data.userData.email);
              if (data.userData.role == 'user') {
                localStorage.setItem('role', 'user');
                setTimeout(() => {
                  this.router.navigate(['/home']);
                  this.showPreloader = false;
                }, 1500);
              } else {
                localStorage.setItem('role', 'admin');
                localStorage.setItem("fName",data.userData.firstName)
                localStorage.setItem("lName",data.userData.lastName)
                
                setTimeout(() => {
                  this.router.navigate(['/dash-board']);
                  this.showPreloader = false;
                }, 1500);
              }
            });
          this.myService.saveUserData();
        }
      },
      (err) => {
        console.log(err, err.error.message);
        if (err.error.message == 'Please register first.') {
          this.errorMessageEmail = 'Email doesn\'t exist, please register first';
          this.errorMessagePassword = '';
          this.errorMessageRegister = ' ';
        } else if (err.error.message == 'Ektb el password sa7.') {
          this.errorMessageEmail = '';
          this.errorMessagePassword = 'Wrong password';
          this.errorMessageRegister = '';
        } else {
          console.log('err', err);
        }
      }
    );
  }
}
