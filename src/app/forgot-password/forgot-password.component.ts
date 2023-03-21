import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  reset: boolean = true;
  verification: boolean = false;
  newPassword: boolean = false;

  
  verificationFunction() {
    this.verification = true;
    this.reset = false;
    this.newPassword = false;
  }

  newPasswordFunction() {
    this.newPassword = true;
    this.verification = false;
    this.reset = false;
  }
}
