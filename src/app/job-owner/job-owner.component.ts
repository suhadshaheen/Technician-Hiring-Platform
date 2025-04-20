import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomePageYComponent } from './home-page-owner/home-page-y/home-page-y.component';
import { OwnerSidebarComponent } from './owner-sidebar/owner-sidebar.component';
@Component({
  selector: 'app-job-owner',
  imports: [RouterModule , HomePageYComponent , OwnerSidebarComponent],
  templateUrl: './job-owner.component.html',
  styleUrl: './job-owner.component.css'
})
export class JobOwnerComponent {
  isCollapsed = false;

  onSidebarToggle(state: boolean) {
    this.isCollapsed = state;
  }

}
