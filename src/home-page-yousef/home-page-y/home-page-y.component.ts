import { Component } from '@angular/core';
import {HowItWorksComponent} from '../how-it-works/how-it-works.component';
import {TopArtisansComponent} from '../top-artisans/top-artisans.component';
import {RecentJobsComponent} from '../recent-jobs/recent-jobs.component';
import {RouterLink} from '@angular/router';
import {HeroSectionComponent} from '../hero-section/hero-section.component';

@Component({
  selector: 'app-home-page-y',
  imports: [
    HowItWorksComponent,
    TopArtisansComponent,
    RecentJobsComponent,
    RouterLink,
    HeroSectionComponent
  ],
  templateUrl: './home-page-y.component.html',
  styleUrl: './home-page-y.component.css'
})
export class HomePageYComponent {
  title = 'Find the Right Technician for the Job';
  subtitle = 'Hire reliable artisans and technicians in your area with ease.';
}
