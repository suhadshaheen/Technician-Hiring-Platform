import { Component } from '@angular/core';
import {JopListComponent} from '../../job-search/jop-list/jop-list.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-active-jobs',
  imports: [
    JopListComponent,
    RouterLink
  ],
  templateUrl: './active-jobs.component.html',
  styleUrl: './active-jobs.component.css'
})
export class ActiveJobsComponent {
  yourActiveBidJobsArray = [
    {
      title: 'Fix Kitchen Sink',
      category: 'Plumbing',
      location: 'Hebron',
      budget: 120,
      deadline: '2025-04-28',
      status: 'Pending'
    },
    {
      title: 'Tile Bathroom',
      category: 'Construction',
      location: 'Ramallah',
      budget: 400,
      deadline: '2025-05-05',
      status: 'Accepted'
    }
  ];

}
