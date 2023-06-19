import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  forgot: boolean = true;
  verification: boolean = false;
  newPassword: boolean = false;

  public forgotForm!: FormGroup;
  public verificationForm!: FormGroup;
  public newPasswordForm!: FormGroup;

  url: string = 'http://localhost:5000/api/v1/auth/forgotPassword/';
  // url: string = 'http://fabrika-env.eba-p22tzwhg.eu-north-1.elasticbeanstalk.com/api/v1/auth/forgotPassword/';
  url2: string = 'http://localhost:5000/api/v1/auth/codeVerification/';
  // url2: string = 'http://fabrika-env.eba-p22tzwhg.eu-north-1.elasticbeanstalk.com/api/v1/auth/codeVerification/';
  url3: string = 'http://localhost:5000/api/v1/auth/resetPassword/';
  // url3: string = 'http://fabrika-env.eba-p22tzwhg.eu-north-1.elasticbeanstalk.com/api/v1/auth/resetPassword/';
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public myService: AuthService
  ) {}
  
  ngOnInit(): void {
    this.forgotForm = this.formBuilder.group({
      email: ''
    });
    this.verificationForm = this.formBuilder.group({
      code: ''
    });
    this.newPasswordForm = this.formBuilder.group({
      newPassword: '',
      cnewPassword: '',
    });
  }
  data: any;
  errorMessageEmail: String = '';
  errorMessageCode: String = '';
  errorMessageCNewPassword: String = '';
  errorMessageNewPassword: String = '';
  successMessage: String = '';

  forgotFunction(){
    this.data=this.forgotForm.value;
    console.log(this.data);
    return this.http.post<any>(this.url,this.data).subscribe(
      (data)=>{
        console.log(data);
        if (data.err){
          console.log(data.err);
          if(data.err[0][0].message=='"email" is not allowed to be empty' ||
          data.err[0][0].message == '"email" must be a valid email'){
            this.errorMessageEmail = 'Please enter a valid email';
          }
          
        }
        else{
          this.forgot=false;
          this.verification=true;
          localStorage.setItem('email',this.data.email)
        }
      },(err)=>{
        console.log(err);
        if(err.status==404){
          this.errorMessageEmail = 'Email Not Found';

        }
      }
    )
    
  }
  verificationFunction(){
    this.data=this.verificationForm.value;
    console.log(this.data);
    return this.http.patch<any>(this.url2,this.data).subscribe(
      (data)=>{
        console.log(data);
        if(data.err){
          if(data.err[0][0].message=='"code" is required'||data.err[0][0].message=='"code" must be a number'){
            this.errorMessageCode="Please enter the code."
          }
          
        }else{
          this.verification=false;
          this.newPassword=true
          
        }
      },(err)=>{
        console.log(err);
        if(err.status==404){
          this.errorMessageCode="Wrong Code"

        }
      }
    )
    
  }

  newPasswordFunction(){
    this.data=this.newPasswordForm.value;
    console.log(this.data);
    return this.http.patch<any>(this.url3+localStorage.getItem('email'),this.data).subscribe(
      (data)=>{
        console.log(data);
       if(data.err){
        if(data.err[0][0].message=='"newPassword" is not allowed to be empty'){
          this.errorMessageCNewPassword = "";
          this.errorMessageNewPassword='Please type password'
        }else if(data.err[0][0].message=='"cnewPassword" must be [ref:newPassword]'){
          this.errorMessageCNewPassword = "Password doesn't match";
          this.errorMessageNewPassword='';
        }
       }
       else{
        this.newPasswordForm.reset();
        this.errorMessageNewPassword='';
        this.errorMessageCNewPassword='';
        this.successMessage="Password reset successfully, "
       }
      },(err)=>{
        console.log(err);
        
      }
    )
    
  }




 


}
