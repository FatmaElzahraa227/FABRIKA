import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  data: any;
  url = 'http://localhost:5000/api/v1/admin/userChart';

  constructor(private elementRef: ElementRef, private http: HttpClient, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.http.get<any>(this.url).subscribe(
      (data) => {
        console.log(data);
        this.data = data;
 
        const labels = this.data.dates.map((date:Date) => {
          const options = 'dd/MM/yyyy';
          return this.datePipe.transform(new Date(date), options);
        });

        const htmlRef = this.elementRef.nativeElement.querySelector(`#myChart`);
        const chart = new Chart(htmlRef, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                backgroundColor: '#990f02',
                borderColor: '#990f02',
                borderWidth: 3,
                fill: false,
                data: this.data.counts,
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
      },
      (err) => {
        console.log(err);
      }
    );
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
}