import {Component, Input} from '@angular/core';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-rating-summary',
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './rating-summary.component.html',
  styleUrl: './rating-summary.component.css'
})
export class RatingSummaryComponent {

  @Input() averageRating: number = 4.6;
  @Input() totalJobs: number = 18;
  @Input() showAverage: boolean = true;
  @Input() showButton: boolean = true;
  @Input() reviewsTitle: string = 'Your Ratings';
  @Input() reviews: any[] = [];


  ngOnInit(): void {

    if (!this.reviews || this.reviews.length === 0) {
      this.reviews = [
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
  }

}
