import { Component } from '@angular/core';

import { TopArtisansComponent } from '../recent-jobs/top-artisans/top-artisans.component';
import {RecentJobsComponent} from '../recent-jobs/recent-jobs.component';
import {RouterLink} from '@angular/router';
import {HeroSectionComponent} from '../hero-section/hero-section.component';
import {HowItWorksGComponent} from '../how-it-works-g/how-it-works-g.component';
import {BestRatingsComponent} from '../best-ratings/best-ratings.component';

@Component({
  selector: 'app-home-page-y',
  imports: [

    TopArtisansComponent,
    RecentJobsComponent,
    RouterLink,
    HeroSectionComponent,
    HowItWorksGComponent,
    BestRatingsComponent
  ],
  templateUrl: './home-page-y.component.html',
  styleUrl: './home-page-y.component.css'
})
export class GuestHomePageYComponent {
  title = 'Find the Right Technician for the Job';
  subtitle = 'Hire reliable artisans and technicians in your area with ease.';
}
