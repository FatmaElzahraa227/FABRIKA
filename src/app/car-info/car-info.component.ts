import { Component, OnInit, ElementRef } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  xValues = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
  yValues = [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15];
  constructor(private elementRef: ElementRef,private router: Router,private http: HttpClient) {
    // if (localStorage.getItem('vehicleToken') != null) {
    //   let encodedVehicleData = JSON.stringify(
    //     localStorage.getItem('vehicleToken')
    //   );
    //   this.vehicleData2 = jwtDecode(encodedVehicleData);
    // }
    let encodedVehicleData = JSON.stringify(
      localStorage.getItem('vehicleToken')
    );
    this.vehicleData2 = jwtDecode(encodedVehicleData);
    this.vehicleData = this.vehicleData2.vehicle;
    this.events = this.vehicleData2.event;
    // console.log(localStorage.getItem('vehicleToken'));
    
    // console.log(this.events);
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
            // pointRadius: 1,
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
 const url  = 'http://fabrika-env.eba-p22tzwhg.eu-north-1.elasticbeanstalk.com/api/v1/vehicle/getEvent/';
 const headers=new HttpHeaders({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
})

 return this.http.get<any>(url+event,{headers:headers}).subscribe(
  (data)=>{
    // console.log(data);
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
