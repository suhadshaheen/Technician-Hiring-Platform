import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-active-bids',
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './active-bids.component.html',
  styleUrl: './active-bids.component.css'
})
export class ActiveBidsComponent {
  jobPosts = [
    { title: 'Fix Plumbing', budget: 120, deadline: 'April 28', canEdit: true },
    { title: 'Paint Room', budget: 250, deadline: 'May 5', canEdit: false },
    { title: 'Install Outlets', budget: 300, deadline: 'May 10', canEdit: true }

  ];

  onDelete(jobTitle: string) {
    console.log(`Delete clicked for ${jobTitle}`);

  }
}
