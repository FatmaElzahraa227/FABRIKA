import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public VINForm!: FormGroup;
  isLogin: boolean = false;
  constructor(
    public myService: AuthService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.myService.userData.subscribe(() => {
      if (this.myService.userData.getValue() != null) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
    this.VINForm = this.formBuilder.group({
      VIN: '',
    });
  }
  url: string = 'http://fabrika-env.eba-p22tzwhg.eu-north-1.elasticbeanstalk.com/api/v1/vehicle/getVehicleData/';
  data: any;
  errorMessage: string = '';

  VIN(){
    const token=localStorage.getItem('userToken');
    this.data=this.VINForm.value;
    console.log(this.data);
    
    const headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    })
    const params = new HttpParams()
  .set('vehicle_vin', this.data.VIN)
    const httpOptions = {
      headers: headers,
      params: params
    }
    console.log(this.data);
    return this.http.get<any>(this.url+this.data.VIN,{headers:headers}).subscribe(
      (data)=>{
        console.log(data);
        
        if(data.err){
          console.log(data.err);
          
        }else{
          localStorage.setItem('vehicleToken',data.token);
          
          this.router.navigate(['/car-info']);
        }
      },(err)=>{
        console.log(err);
        if(err.status==404||err.status==400){
          this.errorMessage = "Sorry, this car isn't available"
        }
      }
    )
    
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
}
}
