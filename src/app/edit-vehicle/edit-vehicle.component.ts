import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.scss'],
})
export class EditVehicleComponent {
  public getVehicleToEditForm!: FormGroup;
  public editVehicleForm!: FormGroup;

  vin: boolean = true;
  edit: boolean = false;

  url1: string = 'http://localhost:5000/api/v1/vehicle/getDataToEdit/';
  url2: string = 'http://localhost:5000/api/v1/vehicle/updateVehicle/';

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

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
    this.getVehicleToEditForm = this.formBuilder.group({
      vehicle_vin: '',
    });
    this.editVehicleForm = this.formBuilder.group({
      color: '',
      displacement: '',
      extra_features: '',
      mileage_miles_y: '',
      mileage_years_x: '',
      model_year: '',
      vehicle_make: '',
      vehicle_model: '',
      pic: '',
      is_stolen: false,
      is_salvaged: false,
      is_insured: false,
      has_mileage: false,
      has_sales_history: false,
      has_service_history: false,
    });
    this.editVehicleForm.valueChanges.subscribe(() => {
      
      const hasChanged = Object.keys(this.copy).some(key => {
        const originalValue = this.copy[key];
        const newValue = this.editVehicleForm.value[key];
        console.log(originalValue !== newValue);
        
        return originalValue !== newValue;
      });
    
      if (hasChanged) {
        this.isFormDirty = true;
      } else {
        this.isFormDirty = false;
      }
    });
  }

  data: any;
  MY: any;
  MX: any;
  data2: any;
  copy:any
  errorMessageVIN: string = '';
  token = localStorage.getItem('userToken');
  errorMessageMake: String = '';
  errorMessageModel: String = '';
  errorMessageYear: String = '';
  errorMessageDisplacement: String = '';
  errorMessageColor: String = '';
  errorMessageMileageX: String = '';
  errorMessageMileageY: String = '';
  successMessage: String = '';
  isFormDirty: boolean = false;

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.token}`,
  });
  getVehicleToEdit() {
    this.data = this.getVehicleToEditForm.value;
    console.log(this.data);
    return this.http
      .get<any>(this.url1 + this.data.vehicle_vin, { headers: this.headers })
      .subscribe(
        (data) => {
          console.log(data);
          if (data.message == 'Edit This Shit.') {
            localStorage.setItem('editVehicle', data.token);
            this.MY = '[' + data.vehicleData.mileage_miles_y.toString() + ']';
            this.MX = '[' + data.vehicleData.mileage_years_x.toString() + ']';
            this.vin = false;
            this.edit = true;
            this.editVehicleForm.patchValue({
              color: data.vehicleData.color,
              displacement: data.vehicleData.displacement,
              extra_features: data.vehicleData.extra_features,
              mileage_miles_y:
                '[' + data.vehicleData.mileage_miles_y.toString() + ']',
              mileage_years_x:
                '[' + data.vehicleData.mileage_years_x.toString() + ']',
              model_year: data.vehicleData.model_year,
              vehicle_make: data.vehicleData.vehicle_make,
              vehicle_model: data.vehicleData.vehicle_model,
              pic: data.vehicleData.pic,
              is_stolen: data.vehicleData.is_stolen,
              is_salvaged: data.vehicleData.is_salvaged,
              is_insured: data.vehicleData.is_insured,
              has_mileage: data.vehicleData.has_mileage,
              has_sales_history: data.vehicleData.has_sales_history,
              has_service_history: data.vehicleData.has_service_history,
            });
            // console.log(data.vehicleData.mileage_miles_y.toString());
            this.copy={ ...this.editVehicleForm.value };
          }

          // console.log(data.err);
        },
        (err) => {
          console.log(err);
          console.log(err.status);
          if (this.getVehicleToEditForm.value.vehicle_vin == '') {
            this.errorMessageVIN = 'Please enter VIN';
          } else if (err.status == 404 || err.status == 400) {
            this.errorMessageVIN = "Vehicle doesn't exist,please add it first";
          }
        }
      );
  }

  editVehicle() {
    try {
      this.data2 = this.editVehicleForm.value;
      delete this.data2.pic;

      if (this.editVehicleForm.value.mileage_years_x != '') {
        const mileageX = this.editVehicleForm.value.mileage_years_x;
        const mileageXArr = JSON.parse(mileageX);
        this.editVehicleForm.value.mileage_years_x = mileageXArr;
      } else {
      }
      if (this.editVehicleForm.value.mileage_miles_y != '') {
        const mileageY = this.editVehicleForm.value.mileage_miles_y;
        const mileageYArr = JSON.parse(mileageY);
        this.editVehicleForm.value.mileage_miles_y = mileageYArr;
      } else {
      }
      if (
        this.editVehicleForm.value.mileage_miles_y.length !=
        this.editVehicleForm.value.mileage_years_x.length
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
        this.vehicleMileageXInputElement.nativeElement.value = this.MX;
        this.vehicleMileageYInputElement.nativeElement.value = this.MY;
        return false;
      } else {
        const editToken = localStorage.getItem('editVehicle');
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${editToken}`,
        });
        return this.http
          .patch<any>(this.url2, this.data2, { headers: headers })
          .subscribe(
            (data) => {
              console.log(data);
              if (data.err) {
                if (
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
                if (data.message == 'Vehicle Updated.') {
                  this.errorMessageModel = '';
                  this.errorMessageMake = '';
                  this.errorMessageYear = '';
                  this.errorMessageDisplacement = '';
                  this.errorMessageColor = '';
                  this.errorMessageMileageX = '';
                  this.errorMessageMileageY = '';
                  this.successMessage = 'Vehicle Updated Successfully';
                  this.vin = true;
                  this.edit = false;
                }
              }
            },
            (err) => {
              console.log(err);
            }
          );
      }
    } catch (err) {
      console.log(err);
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
      this.vehicleMileageXInputElement.nativeElement.value = this.MX;
      this.vehicleMileageYInputElement.nativeElement.value = this.MY;

      return false;
    }
  }
}
