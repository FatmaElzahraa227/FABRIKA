import { Component, Injectable } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
@Injectable({
  providedIn: 'root'
})
export class AppComponent {
  title = 'app';
  showPreloader: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.showPreloader = true;
      }
      else if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.showPreloader = false;
        }, 2000);
          // this.showPreloader = false;
      }
    });
  }
}
