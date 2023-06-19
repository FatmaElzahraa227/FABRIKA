import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  @ViewChild('myInputField') myInputField!: ElementRef;

  public changeForm!: FormGroup;
  url: string =
    'http://localhost:5000/api/v1/auth/changePassword/';
  // url: string =
  //   'http://fabrika-env.eba-p22tzwhg.eu-north-1.elasticbeanstalk.com/api/v1/auth/changePassword/';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public myService: AuthService
  ) {}

  ngOnInit(): void {
    this.changeForm = this.formBuilder.group({
      oldPassword: '',
      newPassword: '',
      cnewPassword: '',
    });
  }

  data: any;
  errorMessageOldPassword: String = '';
  errorMessageNewPassword: String = '';
  errorMessageCNewPassword: String = '';
  error: boolean = false;
  successMessage: String = ' ';

  changePassword() {
    this.data = this.changeForm.value;
    console.log(this.data);
    return this.http
      .patch<any>(this.url + localStorage.getItem('userEmail'), this.data)
      .subscribe(
        (data) => {
          console.log(data);
          if (data.err) {
            if (
              data.err[0][0].message ==
              '"oldPassword" is not allowed to be empty'
            ) {
              this.errorMessageNewPassword = '';
              this.errorMessageCNewPassword = '';
              this.errorMessageOldPassword = 'Please Enter your Old Password';
            } else if (
              data.err[0][0].message ==
              '"newPassword" is not allowed to be empty'
            ) {
              this.errorMessageOldPassword = '';
              this.errorMessageCNewPassword = '';
              this.errorMessageNewPassword = 'Please Enter a New Password';
            } else if (
              data.err[0][0].message ==
              '"cnewPassword" must be [ref:newPassword]'
            ) {
              this.errorMessageOldPassword = '';
              this.errorMessageCNewPassword =
                'Password Mismatch,Please enter it again';
              this.errorMessageNewPassword = '';
              this.changeForm.patchValue({
                newPassword: '',
                cnewPassword: '',
              });
              this.myInputField.nativeElement.focus();
            }
          } else {
            this.successMessage = 'Password Changed Successfully';
            this.errorMessageOldPassword = '';
            this.errorMessageCNewPassword = '';
            this.errorMessageNewPassword = '';
            this.error = false;
            this, this.changeForm.reset();
          }
        },
        (err) => {
          console.log(err.error.message);
          if (
            err.error.message ==
            'Old password is incorrect, try to reset your password instead.'
          ) {
            this.errorMessageOldPassword = '';
            this.errorMessageCNewPassword = '';
            this.errorMessageNewPassword = '';
            this.error = true;
          } else if (
            err.error.message == 'new password cannot be your old password'
          ) {
            this.errorMessageOldPassword = '';
            this.errorMessageCNewPassword = '';
            this.errorMessageNewPassword =
              'new password cannot be your old password';
            this.error = false;
            this.changeForm.reset();
          }
        }
      );
  }

  reset() {
    this.myService.logout();
    this.router.navigate(['/forgot-password']);
  }
}
