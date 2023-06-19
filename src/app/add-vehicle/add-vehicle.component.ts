import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss'],
})
export class AddVehicleComponent {
  public addVehicleForm!: FormGroup;

  url: string = 'http://localhost:5000/api/v1/vehicle/addVehicle/';
  // url: string =
  //   'http://fabrika-env.eba-p22tzwhg.eu-north-1.elasticbeanstalk.com/api/v1/vehicle/addVehicle/';

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}
  @ViewChild('vehicleVinInput', { static: false })
  vehicleVinInputElement!: ElementRef<HTMLInputElement>;
  @ViewChild('vehicleMakeInput', { static: false })
  vehicleMakeInputElement!: ElementRef<HTMLInputElement>;
  @ViewChild('vehicleModelInput', { static: false })
  vehicleModelInputElement!: ElementRef<HTMLInputElement>;
  @ViewChild('vehicleYearInput', { static: false })
  vehicleYearInputElement!: ElementRef<HTMLInputElement>;
  @ViewChild('vehicleColorInput', { static: false })
  vehicleColorInputElement!: ElementRef<HTMLInputElement>;
  @ViewChild('vehicleDisplacementInput', { static: false })
  vehicleDisplacementInputElement!: ElementRef<HTMLInputElement>;
  @ViewChild('vehicleMileageXInput', { static: false })
  vehicleMileageXInputElement!: ElementRef<HTMLInputElement>;
  @ViewChild('vehicleMileageYInput', { static: false })
  vehicleMileageYInputElement!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.addVehicleForm = this.formBuilder.group({
      vehicle_vin: '',
      vehicle_make: '',
      vehicle_model: '',
      model_year: '',
      displacement: '',
      color: '',
      mileage_years_x: '',
      mileage_miles_y: '',
      extra_features: '',
      is_stolen: false,
      is_salvaged: false,
      is_insured: false,
      has_mileage: false,
      has_sales_history: false,
      has_service_history: false,
    });
  }
  data: any;
  token = localStorage.getItem('userToken');
  errorMessageVIN: String = '';
  errorMessageMake: String = '';
  errorMessageModel: String = '';
  errorMessageYear: String = '';
  errorMessageDisplacement: String = '';
  errorMessageColor: String = '';
  errorMessageMileageX: String = '';
  errorMessageMileageY: String = '';
  successMessage: String = '';

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.token}`,
  });

  addVehicle() {
    try {
      if (this.addVehicleForm.value.mileage_years_x != '') {
        const mileageX = this.addVehicleForm.value.mileage_years_x; 
        const mileageXArr = JSON.parse(mileageX);
        this.addVehicleForm.value.mileage_years_x = mileageXArr;
      } else {
      }
      if (this.addVehicleForm.value.mileage_miles_y != '') {
        const mileageY = this.addVehicleForm.value.mileage_miles_y; 
        const mileageYArr = JSON.parse(mileageY);
        this.addVehicleForm.value.mileage_miles_y = mileageYArr;
      } else {
      }
      if (
        this.addVehicleForm.value.mileage_miles_y.length !=
        this.addVehicleForm.value.mileage_years_x.length
      ) {
        this.errorMessageVIN = '';
        this.errorMessageModel = '';
        this.errorMessageMake = '';
        this.errorMessageYear = '';
        this.errorMessageDisplacement = '';
        this.errorMessageColor = '';
        this.errorMessageMileageX = 'Two Arrays are not equal in length';
        this.errorMessageMileageY = '';
        this.successMessage = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.vehicleMileageXInputElement.nativeElement.focus();
        this.vehicleMileageXInputElement.nativeElement.value = '';
        this.vehicleMileageYInputElement.nativeElement.value = '';
        return false;
      } else {
        this.data = this.addVehicleForm.value;
        console.log(this.addVehicleForm.value);
        return this.http
          .post<any>(this.url, this.data, { headers: this.headers })
          .subscribe(
            (data) => {
              if (data.err) {
                console.log(data.err[0]);
                if (
                  data.err[0][0].message ==
                  '"vehicle_vin" is not allowed to be empty'
                ) {
                  this.errorMessageVIN = 'Please Enter Vehicle VIN';
                  this.errorMessageModel = '';
                  this.errorMessageMake = '';
                  this.errorMessageYear = '';
                  this.errorMessageDisplacement = '';
                  this.errorMessageColor = '';
                  this.errorMessageMileageX = '';
                  this.errorMessageMileageY = '';
                  this.successMessage = '';
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  this.vehicleVinInputElement.nativeElement.focus();
                } else if (
                  data.err[0][0].message ==
                  '"vehicle_make" is not allowed to be empty'
                ) {
                  this.errorMessageVIN = '';
                  this.errorMessageModel = '';
                  this.errorMessageMake = 'Please Enter Vehicle Make';
                  this.errorMessageYear = '';
                  this.errorMessageDisplacement = '';
                  this.errorMessageColor = '';
                  this.errorMessageMileageX = '';
                  this.errorMessageMileageY = '';
                  this.successMessage = '';
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  this.vehicleMakeInputElement.nativeElement.focus();
                } else if (
                  data.err[0][0].message ==
                  '"vehicle_model" is not allowed to be empty'
                ) {
                  this.errorMessageVIN = '';
                  this.errorMessageModel = 'Please Enter Vehicle Model';
                  this.errorMessageMake = '';
                  this.errorMessageYear = '';
                  this.errorMessageDisplacement = '';
                  this.errorMessageColor = '';
                  this.errorMessageMileageX = '';
                  this.errorMessageMileageY = '';
                  this.successMessage = '';
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  this.vehicleModelInputElement.nativeElement.focus();
                } else if (
                  data.err[0][0].message ==
                  '"model_year" is not allowed to be empty'
                ) {
                  this.errorMessageVIN = '';
                  this.errorMessageModel = '';
                  this.errorMessageMake = '';
                  this.errorMessageYear = 'Please Enter Vehicle Year';
                  this.errorMessageDisplacement = '';
                  this.errorMessageColor = '';
                  this.errorMessageMileageX = '';
                  this.errorMessageMileageY = '';
                  this.successMessage = '';
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  this.vehicleYearInputElement.nativeElement.focus();
                } else if (
                  data.err[0][0].message == '"color" is not allowed to be empty'
                ) {
                  this.errorMessageVIN = '';
                  this.errorMessageModel = '';
                  this.errorMessageMake = '';
                  this.errorMessageYear = '';
                  this.errorMessageDisplacement = '';
                  this.errorMessageColor = 'Please Enter Vehicle Color';
                  this.errorMessageMileageX = '';
                  this.errorMessageMileageY = '';
                  this.successMessage = '';
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  this.vehicleColorInputElement.nativeElement.focus();
                } else if (
                  data.err[0][0].message ==
                  '"displacement" is not allowed to be empty'
                ) {
                  this.errorMessageVIN = '';
                  this.errorMessageModel = '';
                  this.errorMessageMake = '';
                  this.errorMessageYear = '';
                  this.errorMessageDisplacement =
                    'Please Enter Vehicle Displacement';
                  this.errorMessageColor = '';
                  this.errorMessageMileageX = '';
                  this.errorMessageMileageY = '';
                  this.successMessage = '';
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  this.vehicleDisplacementInputElement.nativeElement.focus();
                } else if (
                  data.err[0][0].message == '"mileage_years_x" must be an array'
                ) {
                  this.errorMessageVIN = '';
                  this.errorMessageModel = '';
                  this.errorMessageMake = '';
                  this.errorMessageYear = '';
                  this.errorMessageDisplacement = '';
                  this.errorMessageColor = '';
                  this.errorMessageMileageX =
                    'Mileage Years Array should be like this [2010,2011,2012,2013]';
                  this.errorMessageMileageY = '';
                  this.successMessage = '';
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  this.vehicleMileageXInputElement.nativeElement.focus();
                } else if (
                  data.err[0][0].message == '"mileage_miles_y" must be an array'
                ) {
                  this.errorMessageVIN = '';
                  this.errorMessageModel = '';
                  this.errorMessageMake = '';
                  this.errorMessageYear = '';
                  this.errorMessageDisplacement = '';
                  this.errorMessageColor = '';
                  this.errorMessageMileageX = '';
                  this.errorMessageMileageY =
                    'Mileage Miles Array should be like this [10000,15000,20000,25000]';
                  this.successMessage = '';
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  this.vehicleMileageYInputElement.nativeElement.focus();
                }
              } else {
                console.log(data);
                if (data.message == 'Added.') {
                  this.errorMessageVIN = '';
                  this.errorMessageModel = '';
                  this.errorMessageMake = '';
                  this.errorMessageYear = '';
                  this.errorMessageDisplacement = '';
                  this.errorMessageColor = '';
                  this.errorMessageMileageX = '';
                  this.errorMessageMileageY = '';
                  this.successMessage = 'Vehicle Added Successfully';
                  this.addVehicleForm.reset({
                    vehicle_vin: '',
                    vehicle_make: '',
                    vehicle_model: '',
                    model_year: '',
                    displacement: '',
                    color: '',
                    mileage_years_x: '',
                    mileage_miles_y: '',
                    extra_features: '',
                    is_stolen: false,
                    is_salvaged: false,
                    is_insured: false,
                    has_mileage: false,
                    has_sales_history: false,
                    has_service_history: false,
                  });
                }
              }
            },
            (err) => {
              console.log(err);
              if (err.error.message == 'Vehicle already exists.') {
                this.errorMessageVIN = 'Vehicle already exists';
                this.errorMessageModel = '';
                this.errorMessageMake = '';
                this.errorMessageYear = '';
                this.errorMessageDisplacement = '';
                this.errorMessageColor = '';
                this.errorMessageMileageX = '';
                this.errorMessageMileageY = '';
                this.successMessage = '';
                this.vehicleVinInputElement.nativeElement.focus();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }
          );
      }
    } catch (error) {
      console.log(error);
      
        this.errorMessageVIN = '';
        this.errorMessageModel = '';
        this.errorMessageMake = '';
        this.errorMessageYear = '';
        this.errorMessageDisplacement = '';
        this.errorMessageColor = '';
        this.errorMessageMileageX =
          'Mileage Years Array should be like this [2010,2011,2012,2013]';
        this.errorMessageMileageY =
          'Mileage Miles Array should be like this [10000,15000,20000,25000]';
        this.successMessage = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.vehicleMileageXInputElement.nativeElement.focus();
        this.vehicleMileageXInputElement.nativeElement.value = '';
        this.vehicleMileageYInputElement.nativeElement.value = '';
      
      return false;
    }
  }
}
