import { Component, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
@Injectable({
  providedIn: 'root',
})
export class AppComponent {
  title = 'app';

  
}
