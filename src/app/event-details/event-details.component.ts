import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { ActivatedRoute,Data } from '@angular/router';
import jwtDecode from 'jwt-decode';


@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent {
  event: any={};

  constructor(private route: ActivatedRoute,private router: Router) {
  
    let encodedEvent = JSON.stringify(
      localStorage.getItem('event')
    );
    this.event = jwtDecode(encodedEvent);
    this.event=this.event.event
    
  }
  
    
  }

