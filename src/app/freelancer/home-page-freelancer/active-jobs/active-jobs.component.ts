import { Component } from '@angular/core';
import {JopListComponent} from '../../job-search/jop-list/jop-list.component';
import {RouterLink} from '@angular/router';
import {FreelancerBidsComponent} from '../../freelancer-bids/freelancer-bids.component';

@Component({
  selector: 'app-active-jobs',
  imports: [

    RouterLink,
    FreelancerBidsComponent
  ],
  templateUrl: './active-jobs.component.html',
  styleUrl: './active-jobs.component.css'
})
export class ActiveJobsComponent {


}
