import { Component } from '@angular/core';

import { FreelancerSidebarComponent } from './freelancer-sidebar/freelancer-sidebar.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-freelancer',
  imports: [FreelancerSidebarComponent,RouterModule],
  templateUrl: './freelancer.component.html',
  styleUrl: './freelancer.component.css'
})
export class FreelancerComponent {
  isCollapsed = false;

  onSidebarToggle(state: boolean) {
    this.isCollapsed = state;
  }

}
