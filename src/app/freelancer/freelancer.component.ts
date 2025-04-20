import { Component } from '@angular/core';
import { HomePageYComponent } from './home-page-freelancer/home-page-y/home-page-y.component';
import { FreelancerSidebarComponent } from './freelancer-sidebar/freelancer-sidebar.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-freelancer',
  imports: [HomePageYComponent,FreelancerSidebarComponent,RouterModule],
  templateUrl: './freelancer.component.html',
  styleUrl: './freelancer.component.css'
})
export class FreelancerComponent {
  isCollapsed = false;

  onSidebarToggle(state: boolean) {
    this.isCollapsed = state;
  }
  
}
