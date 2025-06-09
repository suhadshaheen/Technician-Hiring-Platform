import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReviewData, ReviewService } from '../../../../../services/review.service';

@Component({
  selector: 'app-job-bid',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  templateUrl: './job-bid.component.html',
  styleUrl: './job-bid.component.css'
})
export class JobBidComponent {
  @Input() name!: string;
  @Input() date: string | null = null;
  @Input() work_time_line!: string;
  @Input() bid_amount!: number;
  @Input() freelancerId!: number;
  @Input() bidId!: number;
  @Input() canEdit: boolean = false;
  @Input() status: 'pending' | 'approved' | 'rejected' | 'accepted' = 'pending';
  @Input() jobStatus!: string;

  @Output() approveBid = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  showModal: boolean = false;
  ratingValue: number = 5;
  comment: string = '';

  constructor(private http: HttpClient ,private reviewService: ReviewService) {}

  approve() {
    this.status = 'accepted';
    this.approveBid.emit(this.bidId);
  }

  reject() {
    this.status = 'rejected';
    this.delete.emit(this.bidId);
  }

  setRating(value: number) {
    this.ratingValue = value;
  }

  submitRating() {
      if (this.ratingValue < 1 || this.ratingValue > 5) {
        alert('Please enter a rating between 1 and 5');
        return;
      }

      if (!this.bidId || !this.freelancerId) {
        alert('The requested data is incomplete');
        return;
      }

      const ratingData: ReviewData = {
        bidId: this.bidId,
        freelancerId: this.freelancerId,
        rating: this.ratingValue,
        comment: this.comment
      };

      const token = localStorage.getItem('token');
      if (!token) {
        alert('Not authenticated. Please log in.');
        return;
      }

      this.reviewService.submitReview(ratingData, token).subscribe({
        next: (res) => {
          this.showModal = false;
          this.ratingValue = 5;
          this.comment = '';
          alert('The rating was saved successfully.');
        },
        error: (err) => {
          alert('You already rated this bid.');
        }
      });
    }

}
