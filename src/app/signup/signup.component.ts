import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  public signUpForm!: FormGroup;

  url: string = 'http://localhost:5000/api/v1/auth/signUp/';
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: '',
      password: '',
      cPassword: '',
      firstName: '',
      phone: '',
      lastName: '',
    });
  }
  // data:any
  st: any;
  errorMessageEmail: String = '';
  errorMessageFName: String = '';
  errorMessageLName: String = '';
  errorMessagePassword: String = '';
  errorMessageCPassword: String = '';
  errorMessageNumber: String = '';
  signUp() {
    // this.data={
    //   vehicle_vin:"noinhoy7h"
    // }
    this.st = this.signUpForm.value;
    console.log(this.st);
    return this.http.post<any>(this.url, this.st).subscribe(
      (st) => {
        if (st.err) {
          console.log(st.err[0][0].message);
          if (
            st.err[0][0].message == '"firstName" is not allowed to be empty' ||
            st.err[0][0].message ==
              '"firstName" length must be at least 3 characters long'
          ) {
            {
              this.errorMessageNumber = '';
              this.errorMessagePassword = '';
              this.errorMessageCPassword = '';
              this.errorMessageLName = '';
              this.errorMessageEmail = '';
              this.errorMessageFName =
                'Please fill first name with 3 or more characters';
            }
          } else if (
            st.err[0][0].message == '"lastName" is not allowed to be empty' ||
            st.err[0][0].message ==
              '"lastName" length must be at least 3 characters long'
          ) {
            {
              this.errorMessagePassword = '';
              this.errorMessageCPassword = '';
              this.errorMessageEmail = '';
              this.errorMessageFName = '';
              this.errorMessageNumber = '';
              this.errorMessageLName =
                'Please fill last name with 3 or more characters';
            }
          } else if (
            st.err[0][0].message == '"email" is not allowed to be empty' ||
            st.err[0][0].message == '"email" must be a valid email'
          ) {
            {
              this.errorMessagePassword = '';
              this.errorMessageCPassword = '';
              this.errorMessageNumber = '';
              this.errorMessageFName = '';
              this.errorMessageLName = '';
              this.errorMessageEmail = 'Please enter a valid email';
            }
          } else if (
            st.err[0][0].message == '"password" is not allowed to be empty'
          ) {
            {
              this.errorMessageCPassword = '';
              this.errorMessageFName = '';
              this.errorMessageLName = '';
              this.errorMessageNumber = '';
              this.errorMessageEmail = '';
              this.errorMessagePassword = 'Please type password';
            }
          } else if (
            st.err[0][0].message == '"cPassword" must be [ref:password]'
          ) {
            {
              this.errorMessagePassword = '';
              this.errorMessageFName = '';
              this.errorMessageLName = '';
              this.errorMessageNumber = '';
              this.errorMessageEmail = '';
              this.errorMessageCPassword = "Password doesn't match";
            }
          } else if (
            st.err[0][0].message == '"phone" is not allowed to be empty' ||
            st.err[0][0].message ==
              '"phone" length must be at least 11 characters long'||st.err[0][0].message =='"phone" length must be less than or equal to 11 characters long'
          ) {
            {
              this.errorMessagePassword = '';
              this.errorMessageFName = '';
              this.errorMessageLName = '';
              this.errorMessageNumber = 'Please type a valid phone number';
              this.errorMessageEmail = '';
              this.errorMessageCPassword = '';
            }
          } else {
            console.log(st.err);
          }
        } else {
          console.log('Successful');
          this.signUpForm.reset();
          this.router.navigate(['/login']);
        }
      },
      (err) => {
        if (err.error.message == 'Email already exists') {
          this.errorMessagePassword = '';
          this.errorMessageCPassword = '';
          this.errorMessageFName = '';
          this.errorMessageNumber = '';
          this.errorMessageLName = '';
          this.errorMessageEmail = 'Email already exists';
        } else if (err.error.message == 'Phone number already exists') {
          this.errorMessageNumber = 'Phone number already exists';
          this.errorMessagePassword = '';
          this.errorMessageCPassword = '';
          this.errorMessageFName = '';
          this.errorMessageLName = '';
          this.errorMessageEmail = '';
        } else {
          console.log('err', err);
        }
      }
    );
  }
  
  
}
