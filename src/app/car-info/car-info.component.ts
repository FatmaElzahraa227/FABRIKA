import { Component, OnInit, ElementRef } from '@angular/core';
import jwtDecode from 'jwt-decode';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.scss'],
})
export class CarInfoComponent implements OnInit {
  vehicleData2: any = {};
  vehicleData: any = {};
  event: any = {};
  xValues = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
  yValues = [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15];
  constructor(private elementRef: ElementRef) {
    if (localStorage.getItem('vehicleToken') != null) {
      let encodedVehicleData = JSON.stringify(
        localStorage.getItem('vehicleToken')
      );
      this.vehicleData2 = jwtDecode(encodedVehicleData);
    }
    let encodedVehicleData = JSON.stringify(
      localStorage.getItem('vehicleToken')
    );
    this.vehicleData2 = jwtDecode(encodedVehicleData);
    this.vehicleData = this.vehicleData2.vehicle;
    this.event = this.vehicleData2.event;
    console.log(localStorage.getItem('vehicleToken'));
    
    console.log(this.vehicleData);
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
}
