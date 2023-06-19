import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-help-page',
  templateUrl: './help-page.component.html',
  styleUrls: ['./help-page.component.scss'],
})
export class HelpPageComponent {
  showPreloader=true;
  url: string = 'http://localhost:5000/api/v1/admin/getFAQ/';
  // url: string = 'http://fabrika-env.eba-p22tzwhg.eu-north-1.elasticbeanstalk.com/api/v1/admin/getFAQ/';
  constructor(private http: HttpClient) {}

  data:any;

  ngOnInit(): void {
    this.showPreloader=true;
    this.http
      .get<any>(this.url)
      .subscribe((response) => {
        this.data = response;
        this.data=this.data.freQAQ;
        console.log(this.data);
        setTimeout(() => {
          this.showPreloader = false;
        }, 1500);
      });
  }
  
}
