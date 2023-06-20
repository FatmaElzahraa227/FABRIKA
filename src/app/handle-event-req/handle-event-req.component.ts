import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-handle-event-req',
  templateUrl: './handle-event-req.component.html',
  styleUrls: ['./handle-event-req.component.scss'],
})
export class HandleEventReqComponent {
  url: string = 'http://localhost:5000/api/v1/admin/showEventReqs';
  constructor(private http: HttpClient) {}

  data: any;
  sortedReqs!: any[];
  selectedEventDesc!: string;
  allPicsGiven: boolean = true; // Add a new property to track if all pics are given

  ngOnInit() {
    this.http.get(this.url).subscribe(
      (data) => {
        console.log(data);
        this.data = data;
        this.sortedReqs = this.data.newReqs.sort((a:any, b:any) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        this.selectedEventDesc=this.sortedReqs[0].event_desc
        console.log(this.data.newReqs[0].vehicle_pics);

        // Check if any required picture is missing and update the allPicsGiven property accordingly
        if (!this.data.newReqs.every((req: any) => req.numplate_pics && req.vehicle_pics && req.walkaround_vid && req.vin_pics)) {
          this.allPicsGiven = false;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  selectedMessageIndex: number = 0;

  showMessage(index: number) {
    this.selectedMessageIndex = index;
    this.selectedEventDesc = this.sortedReqs[index];
  }

  getFormattedTime(dateString: string): string {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'Africa/Cairo',
    });
    const formattedTime = formatter.format(date);
    return `${formattedTime} `;
  }

  formatDate(createdAt: string): string {
    const date = new Date(createdAt);
    return date
      .toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
      .replace(/(\d+)\/(\d+)\/(\d+)/, '$2/$1/$3');
  }
}