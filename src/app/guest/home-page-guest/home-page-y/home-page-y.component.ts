import { Component } from '@angular/core';

import { TopArtisansComponent } from '../top-artisans/top-artisans.component';
import {RecentJobsComponent} from '../recent-jobs/recent-jobs.component';
import {RouterLink} from '@angular/router';
import {HeroSectionComponent} from '../hero-section/hero-section.component';
import {HowItWorksJComponent} from '../../../job-owner/home-page-owner/how-it-works-j/how-it-works-j.component';
import {HowItWorksGComponent} from '../how-it-works-g/how-it-works-g.component';
import {
  RatingsSummaryComponent
} from '../../../freelancer/home-page-freelancer/ratings-summary/ratings-summary.component';

@Component({
  selector: 'app-home-page-y',
  imports: [

    TopArtisansComponent,
    RecentJobsComponent,
    RouterLink,
    HeroSectionComponent,
    HowItWorksJComponent,
    HowItWorksGComponent,
    RatingsSummaryComponent
  ],
  templateUrl: './home-page-y.component.html',
  styleUrl: './home-page-y.component.css'
})
export class GuestHomePageYComponent {
  title = 'Find the Right Technician for the Job';
  subtitle = 'Hire reliable artisans and technicians in your area with ease.';
  topArtisans = [
    {
      client: 'Ahmad Y.',
      rating: 5,
      comment: 'Excellent tile work!',
      date: 'March 20, 2025'
    },
    {
      client: 'Salma A.',
      rating: 5,
      comment: 'Very professional and quick.',
      date: 'March 18, 2025'
    },
    {
      client: 'Omar K.',
      rating: 4,
      comment: 'Great service, will hire again.',
      date: 'March 15, 2025'
    }
  ];

}
