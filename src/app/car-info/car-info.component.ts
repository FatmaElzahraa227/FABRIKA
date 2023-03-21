import { Component } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.scss'],
})
export class CarInfoComponent {
  
  vehicleData2 :any= {};
  vehicleData :any= {};
  constructor() {
    if(localStorage.getItem('vehicleToken')!=null){
      let encodedVehicleData = JSON.stringify(
        localStorage.getItem('vehicleToken')
      );
      this.vehicleData2=jwtDecode(encodedVehicleData);
    }
    let encodedVehicleData = JSON.stringify(
      localStorage.getItem('vehicleToken')
    );
    this.vehicleData2=jwtDecode(encodedVehicleData);
    this.vehicleData=this.vehicleData2.vehicle
    console.log(this.vehicleData.vehicle);
  }
}
