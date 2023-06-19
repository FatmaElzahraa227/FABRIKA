import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent {
  url: string = 'http://localhost:5000/api/v1/admin/getNewNotifications';

  constructor(private http: HttpClient) {}

  data: any;
  showPreloader=false;

  ngOnInit(): void {
    this.showPreloader=true
    this.http.get<any>(this.url).subscribe(
      (data) => {
        console.log(data);
        this.data = data;
        this.data.newNotis.reverse();
        let i = 0;
        while (i < this.data.newNotis.length - 1) {
          if (
            this.data.newNotis[i].fullname ==
              this.data.newNotis[i + 1].fullname &&
            this.data.newNotis[i].action == this.data.newNotis[i + 1].action
          ) {
            this.data.newNotis.splice(i + 1, 1);
          } else {
            i++;
          }
        }
        setTimeout(() => {
          this.showPreloader = false;
        }, 1500);
      },
      (err) => {
        console.log(err);
      }
    );
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
  groupNotificationsByDay(notifications: any[]): any[] {
    const groupedNotifications: any[] = [];
    let currentDay: string | null = null; 
    let currentNotifications: any[] = [];

    notifications.forEach((notification) => {
      const date = new Date(notification.createdAt);
      const day = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

      if (day !== currentDay) {
        if (currentDay !== null) { 
          groupedNotifications.push({
            day: currentDay,
            notifications: currentNotifications
          });
        }
        currentDay = day;
        currentNotifications = [];
      }

      currentNotifications.push(notification);
    });

    if (currentDay !== null) { 
      groupedNotifications.push({
        day: currentDay,
        notifications: currentNotifications
      });
    }

    return groupedNotifications;
  }
}
