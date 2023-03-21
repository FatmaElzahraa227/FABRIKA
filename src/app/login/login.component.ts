import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm!: FormGroup;

  url: string = 'http://localhost:5000/api/v1/auth/signIn/';
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
          this.loginForm.reset();
          localStorage.setItem('userToken', st.token);
          this.myService.saveUserData();
          this.router.navigate(['/home']);
        }
      },
      (err) => {
        console.log(err, err.error.message);
        if (err.error.message == 'Please register first.') {
          this.errorMessageEmail = '';
          this.errorMessagePassword = '';
          this.errorMessageRegister = ' ,Please Signup first';
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
