import { Component } from '@angular/core';
import {HowItWorksComponent} from '../how-it-works/how-it-works.component';


import {RouterLink} from '@angular/router';
import {HeroSectionComponent} from '../hero-section/hero-section.component';
import {ActiveBidsComponent} from '../active-bids/active-bids.component';
import {RatingSummaryComponent} from '../../../freelancer/home-page-freelancer/rating-summary/rating-summary.component';

@Component({
  selector: 'app-home-page-y',
  imports: [
    HowItWorksComponent,
    RouterLink,
    HeroSectionComponent,
    ActiveBidsComponent,
    RatingSummaryComponent
  ],
  templateUrl: './home-page-y.component.html',
  styleUrl: './home-page-y.component.css'
})
export class HomePageYComponent {
  title = 'Find the Right Technician for the Job';
  subtitle = 'Hire reliable artisans and technicians in your area with ease.';
}
