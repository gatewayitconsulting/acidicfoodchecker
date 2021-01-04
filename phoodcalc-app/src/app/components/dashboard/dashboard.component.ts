import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  responsive = false;
  desktop = false;
  breakpoint = 600;
  
  constructor() {}
  
  ngOnInit() {
    if (window.screen.width < this.breakpoint) { 
      this.responsive = true;
    } else {
      this.desktop = true;
    }
  }
}
