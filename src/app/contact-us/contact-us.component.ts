import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent {
  public messageayaForm!: FormGroup;
  url: string = 'http://localhost:5000/api/v1/user/contactUs';
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.messageayaForm = this.formBuilder.group({
      email: '',
      full_name: '',
      message: '',
    });
  }
  data: any;
  errorMessageEmail: String = '';
  errorMessageName: String = '';
  errorMessageMessage: String = '';
  successMessage: String = '';

  sendMessage() {
    this.data = this.messageayaForm.value;
    console.log(this.data);
    return this.http.post<any>(this.url, this.data).subscribe(
      (data) => {
        if (data.err) {
          console.log(data.err[0][0].message);
          if (
            data.err[0][0].message ==
              '"full_name" is not allowed to be empty' ||
            data.err[0][0].message ==
              '"full_name" length must be at least 6 characters long'||data.err[0][0].message=='"full_name" must be a string'
          ) {
            this.errorMessageEmail = '';
            this.errorMessageName =
              'Please fill name with 6 or more characters';
            this.errorMessageMessage = '';
            this.successMessage = '';
          } else if (
            data.err[0][0].message == '"email" is not allowed to be empty' ||
            data.err[0][0].message == '"email" must be a valid email'||
            data.err[0][0].message =='"email" must be a string'
          ) {
            this.errorMessageEmail = 'Please enter a valid email';
            this.errorMessageName = '';
            this.errorMessageMessage = '';
            this.successMessage = '';
          } else if (
            data.err[0][0].message == '"message" is not allowed to be empty' ||
            data.err[0][0].message ==
              '"message" length must be at least 10 characters long'||
              data.err[0][0].message =='"message" must be a string'
          ) {
            this.errorMessageEmail = '';
            this.errorMessageName = '';
            this.errorMessageMessage =
              "Please type a message that it's at least 10 characters long";
            this.successMessage = '';
          }
        } else {
          console.log(data);
          this.errorMessageEmail = '';
          this.errorMessageName = '';
          this.errorMessageMessage = '';
          this.successMessage = 'Message sent successfully';
          this.messageayaForm.reset();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
