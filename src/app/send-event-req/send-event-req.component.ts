import { Component } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-send-event-req',
  templateUrl: './send-event-req.component.html',
  styleUrls: ['./send-event-req.component.scss'],
})
export class SendEventReqComponent {
  selectedFiles!: FileList;
  readonly MAX_FILES = 10;
  readonly MIN_FILES = 4;

  constructor(private http: HttpClient) {}

  onSelectFile(event: any) {
    this.selectedFiles = event.target.files;
  }
  token = localStorage.getItem('userToken');
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
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
      alert(
        `Please select between ${this.MIN_FILES} and ${this.MAX_FILES} image files for the accident.`
      );
      return;
    }

    if (!accidentFiles) {
      alert('Please select a file for the accident.');
      return;
    }

    if (!numPlateFile) {
      alert('Please select a file for the number plate.');
      return;
    }

    if (!vinFile) {
      alert('Please select a file for the VIN picture.');
      return;
    }

    if (!walkAroundFile) {
      alert('Please select a walk-around video in MP4 format.');
      return;
    }

    if (walkAroundFile.type !== 'video/mp4') {
      alert(
        'The selected file is not in MP4 format. Please select a walk-around video in MP4 format.'
      );
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
    formData.append('walkAround', walkAroundFile);
   
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    console.log(this.headers);
    const options = {
      headers: this.headers
    };
    this.http
      .patch('http://localhost:5000/api/v1/vehicle/sendEventReq', formData,options)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(options);
          
          console.error(error);
        }
      );
  }
}
