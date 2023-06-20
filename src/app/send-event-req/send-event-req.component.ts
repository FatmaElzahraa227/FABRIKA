import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-send-event-req',
  templateUrl: './send-event-req.component.html',
  styleUrls: ['./send-event-req.component.scss'],
})
export class SendEventReqComponent {
  public sendEventReq!: FormGroup;
  selectedFiles!: FileList;
  readonly MAX_FILES = 10;
  readonly MIN_FILES = 4;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.sendEventReq = this.formBuilder.group({
      event_desc: '',
    });
  }
  data: any;
  errorMessageAccident: string = '';
  errorMessageNumberplate: string = '';
  errorMessageWalkAround: string = '';
  errorMessageVIN: string = '';

  onSelectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  token = localStorage.getItem('userToken');
  boundary = Math.random().toString().substr(2);
  headers = new HttpHeaders({
    'Content-Type': `multipart/form-data; boundary=${this.boundary}`,
    Authorization: `Bearer ${this.token}`,
  });

  onUpload() {
    console.log(this.token);

    const accidentInput = document.querySelector(
      '#accidentFiles'
    ) as HTMLInputElement;
    const accidentFiles = accidentInput?.files;
    const numPlateInput = document.querySelector(
      '#numPlateFile'
    ) as HTMLInputElement;
    const numPlateFile = numPlateInput?.files?.[0];
    const vinInput = document.querySelector('#vinInput') as HTMLInputElement;
    const vinFile = vinInput?.files?.[0];
    const walkAroundInput = document.querySelector(
      '#walkAroundInput'
    ) as HTMLInputElement;
    const walkAroundFile = walkAroundInput?.files?.[0];

    // Check if all required files are selected
    if (
      accidentFiles &&
      (accidentFiles.length < this.MIN_FILES ||
        accidentFiles.length > this.MAX_FILES)
    ) {
      this.errorMessageAccident = `Please select between ${this.MIN_FILES} and ${this.MAX_FILES} image files for the accident.`;
      this.errorMessageNumberplate = '';
      this.errorMessageWalkAround = '';
      this.errorMessageVIN = '';
      return;
    }

    if (!accidentFiles) {
      this.errorMessageAccident = 'Please select a file for the accident.';
      this.errorMessageNumberplate = '';
      this.errorMessageWalkAround = '';
      this.errorMessageVIN = '';
      return;
    }

    if (!numPlateFile) {
      this.errorMessageAccident = '';
      this.errorMessageNumberplate =
        'Please select a file for the number plate.';
      this.errorMessageWalkAround = '';
      this.errorMessageVIN = '';
      return;
    }

    if (!vinFile) {
      this.errorMessageAccident = '';
      this.errorMessageNumberplate = '';
      this.errorMessageWalkAround = '';
      this.errorMessageVIN = 'Please select a file for the VIN picture.';
      return;
    }

    if (!walkAroundFile) {
      this.errorMessageAccident = '';
      this.errorMessageNumberplate = '';
      this.errorMessageWalkAround =
        'Please select a walk-around video in MP4 format.';
      this.errorMessageVIN = '';
      return;
    }
    
    if (walkAroundFile.type !== 'video/mp4') {
      this.errorMessageAccident = '';
      this.errorMessageNumberplate = '';
      this.errorMessageWalkAround =
        'The selected file is not in MP4 format. Please select a walk-around video in MP4 format.';
      this.errorMessageVIN = '';
     
      return;
    }

    const formData = new FormData();
    if (accidentFiles) {
      for (let i = 0; i < accidentFiles.length; i++) {
        formData.append('Images', accidentFiles[i]);
      }
    }
    formData.append('numPlates', numPlateFile);
    formData.append('VIN', vinFile);
    formData.append('walkaround', walkAroundFile);
    formData.append('event_desc', this.sendEventReq.value.event_desc);

    formData.forEach((value, key) => {
      console.log(key, value);
    });
    console.log(this.headers);
    const options = {
      headers: this.headers,
    };
    // this.data=this.sendEventReq.value;
    const sent_by = localStorage.getItem('userID');
    this.http
      .post(
        `http://localhost:5000/api/v1/vehicle/sendEventReq/${sent_by}`,
        formData
      )
      .subscribe(
        (response) => {
          console.log(response);
          // if(response.message=='all good')
        },
        (error) => {
          console.log(options);

          console.error(error);
        }
      );
  }
}
