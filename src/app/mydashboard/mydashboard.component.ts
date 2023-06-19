import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mydashboard',
  templateUrl: './mydashboard.component.html',
  styleUrls: ['./mydashboard.component.scss']
})
export class MydashboardComponent {
  url:string='http://localhost:5000/api/v1/user/getProfile/'
  constructor(
    public myService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}
  showPreloader=true;
  data: any;
  token = localStorage.getItem('userToken');
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.token}`,
  });
  ngOnInit(): void {
    this.showPreloader=true;
    this.http
      .get<any>(this.url, { headers: this.headers })
      .subscribe((response) => {
        this.data = response;
        console.log(this.data);
        setTimeout(() => {
          this.showPreloader = false;
        }, 1500);
      });
  }
  carInfo(vin: string) {
    this.showPreloader=true;
    const url = 'http://localhost:5000/api/v1/vehicle/getVehicleData/';
    // const url = 'http://fabrika-env.eba-p22tzwhg.eu-north-1.elasticbeanstalk.com/api/v1/vehicle/getVehicleData/';
    const token = localStorage.getItem('userToken');
    var data;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }).set('vehicle_vin', vin);
    console.log(data);
    return this.http
      .get<any>(url + vin, { headers: headers })
      .subscribe(
        (data) => {
          console.log(data);

          if (data.err) {
            console.log(data.err);
          } else {
            localStorage.setItem('vehicleToken', data.token);
            setTimeout(() => {
              this.showPreloader = false;
              this.router.navigate(['/car-info']);
            }, 1500);

          }
        },
        (err) => {
        }
      );
  }
}
