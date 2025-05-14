import {Component, Input} from '@angular/core';
import {JopListComponent} from '../../../freelancer/job-search/jop-list/jop-list.component';
import {RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-guest-jobs',
  imports: [
    JopListComponent,
    RouterLink,
    NgIf
  ],
  templateUrl: './guest-jobs.component.html',
  styleUrl: './guest-jobs.component.css'
})
export class GuestJobsComponent {
  @Input() showButtonBar: boolean = true;
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
