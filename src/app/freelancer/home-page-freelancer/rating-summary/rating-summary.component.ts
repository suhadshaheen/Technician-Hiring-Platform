import {Component, Input} from '@angular/core';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {ReviewService} from '../../../../services/review.service';

@Component({
  selector: 'app-rating-summary',
  imports: [
    NgForOf,

  ],
  templateUrl: './rating-summary.component.html',
  styleUrl: './rating-summary.component.css'
})
export class RatingSummaryComponent {
  @Input() reviews: any[] = [];


  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.reviewService.TopRated().subscribe((data: any) => {
      this.reviews = data;
    });
  }


}
