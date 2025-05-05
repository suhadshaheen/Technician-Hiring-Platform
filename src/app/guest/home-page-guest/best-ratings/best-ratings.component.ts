import { Component } from '@angular/core';
import {RatingSummaryComponent} from '../../../freelancer/home-page-freelancer/rating-summary/rating-summary.component';

@Component({
  selector: 'app-best-ratings',
  imports: [
    RatingSummaryComponent
  ],
  templateUrl: './best-ratings.component.html',
  styleUrl: './best-ratings.component.css'
})
export class BestRatingsComponent {
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
