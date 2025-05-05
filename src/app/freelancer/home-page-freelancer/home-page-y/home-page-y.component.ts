import { Component } from '@angular/core';



import {RouterLink} from '@angular/router';
import {HeroSectionComponent} from '../hero-section/hero-section.component';
import {ActiveJobsComponent} from '../active-jobs/active-jobs.component';
import {RecentMsgComponent} from '../recent-msg/recent-msg.component';
import {RatingSummaryComponent} from '../rating-summary/rating-summary.component';

@Component({
  selector: 'app-home-page-y',
  imports: [

    RouterLink,
    HeroSectionComponent,
    ActiveJobsComponent,
    RecentMsgComponent,
    RatingSummaryComponent
  ],
  templateUrl: './home-page-y.component.html',
  styleUrl: './home-page-y.component.css'
})
export class FreelancerHomePageYComponent {
  title = 'Find the Right Technician for the Job';
  subtitle = 'Hire reliable artisans and technicians in your area with ease.';
  freelancerReviews = [
    {
      client: 'Ali J.',
      rating: 5,
      comment: 'Great work! Super fast and professional.',
      date: 'April 15, 2025'
    },
    {
      client: 'Nour A.',
      rating: 4,
      comment: 'Very good but a bit late to start.',
      date: 'April 12, 2025'
    },
    {
      client: 'Huda K.',
      rating: 5,
      comment: 'Perfect results. Would hire again!',
      date: 'April 9, 2025'
    }
  ];
}
