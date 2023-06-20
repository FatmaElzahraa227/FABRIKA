import { Component, OnInit, ElementRef } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.scss'],
})
export class CarInfoComponent implements OnInit {
  showPreloader=false;
  vehicleData2: any = {};
  vehicleData: any = {};
  events: any = {};
  constructor(private elementRef: ElementRef,private router: Router,private http: HttpClient) {
    let encodedVehicleData = JSON.stringify(
      localStorage.getItem('vehicleToken')
    );
    this.vehicleData2 = jwtDecode(encodedVehicleData);
    this.vehicleData = this.vehicleData2.vehicle;
    this.events = this.vehicleData2.event;
  }
  ngOnInit() {
    let htmlRef = this.elementRef.nativeElement.querySelector(`#myChart`);
    let chart = new Chart(htmlRef, {
      type: 'line',
      data: {
        labels: this.vehicleData.mileage_years_x,
        datasets: [
          {
            backgroundColor: '#990f02',
            borderColor: '#990f02',
            borderWidth:5,
            fill: false,
            data: this.vehicleData.mileage_miles_y,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        events: [],
      },
    });
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
}

goToEventDetails(event: any) {
  this.showPreloader=true;
  const token=localStorage.getItem('userToken');
 const url  = 'http://localhost:5000/api/v1/vehicle/getEvent/';
//  const url  = 'http://fabrika-env.eba-p22tzwhg.eu-north-1.elasticbeanstalk.com/api/v1/vehicle/getEvent/';
 const headers=new HttpHeaders({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
})

 return this.http.get<any>(url+event,{headers:headers}).subscribe(
  (data)=>{
    localStorage.setItem('event', data);
    setTimeout(() => {
      this.router.navigate(['/event-details'], { fragment: 'top' });
      this.showPreloader = false;
    }, 1500);
  },(err)=>{
    console.log(err);
    
  }
 )
  
}
}
