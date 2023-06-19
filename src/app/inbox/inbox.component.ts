import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
})
export class InboxComponent {
  url: string = 'http://localhost:5000/api/v1/admin/getMessages';

  constructor(private http: HttpClient) {}

  data: any;
  selectedMessage!: string;
  selectedMessageName!: string;
  selectedMessageTime!: string;
  selectedMessageEmail!: string;
  showPreloader=false;

  ngOnInit(): void {
    this.showPreloader=true
    this.http.get<any>(this.url).subscribe(
      (data) => {
        console.log(data);
        this.data = data;
        this.data.newMsg.reverse();
        this.selectedMessage = this.data.newMsg[0].message;
        this.selectedMessageName = this.data.newMsg[0].full_name;
        this.selectedMessageTime = this.data.newMsg[0].createdAt;
        this.selectedMessageEmail = this.data.newMsg[0].email;
        setTimeout(() => {
          this.showPreloader = false;
        }, 1500);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  selectedMessageIndex: number = 0;

  showMessage(index: number) {
    this.selectedMessageIndex = index;
    this.selectedMessage = this.data.newMsg[index].message;
    this.selectedMessageName = this.data.newMsg[index].full_name;
    this.selectedMessageTime = this.data.newMsg[index].createdAt;
    this.selectedMessageEmail= this.data.newMsg[index].email;
    // window.scrollTo({ top: 0, behavior: 'smooth' });
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
