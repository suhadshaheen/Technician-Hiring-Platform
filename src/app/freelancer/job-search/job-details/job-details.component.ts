import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../../../../services/Jobservice.service';
import { Job } from '../../../../models/Job';
import { BidService } from '../../../../services/Bid.service';
import { AuthService } from '../../../user-roles-yousef/services/AuthService';
import { FormsModule } from '@angular/forms';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Bid} from '../../../../models/Bid';

declare var bootstrap: any;


@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
  standalone: true,
  imports: [FormsModule, NgClass, NgForOf, NgIf, RouterModule],
})
export class JobDetailsComponent implements OnInit {
  jobId: number = 0;
  job: Job | null = null;
  bidAmount: number = 0;
  workTimeline: string = '';
  experience : string = '';
  work_level : string ='';
  bids: Bid[] = [];
  userId!: number;
  userRole!: string;
  jobPoints: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private bidService: BidService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.jobId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadJob();
    // this.loadBids();


    this.userId = 23;
    this.userRole = 'freelancer';
  }

  loadJob() {
    this.jobService.getJobById(this.jobId).subscribe({
      next: (data) => {
        this.job = data;
        try {
          const requirementsObj = JSON.parse(this.job.job_requirements ?? '{}');
          this.jobPoints = Object.values(requirementsObj);
        } catch (e) {
          this.jobPoints = this.job.job_requirements ? [this.job.job_requirements] : [];
        }
      },
      error: (err) => {
        console.error('Failed to load job:', err);
      }
    });
  }

  // loadBids() {
  //   this.bidService.getBidsForJob(this.jobId).subscribe({
  //     next: (data) => {
  //       this.bids = data;
  //     },
  //     error: (err) => {
  //       console.error('Failed to load bids:', err);
  //     },
  //   });
  // }

  onSubmitBid() {
  if (this.hasBid()) {
    alert('You have already placed a bid for this job.');
    return;
  }

  const newBid: Bid = {
    job_id: this.jobId,
    freelancer_id: this.userId,
    bid_amount: this.bidAmount,
    work_time_line: this.workTimeline,
  };

  this.bidService.submitBid(newBid).subscribe({
    next: (response: Bid) => {
      alert('Bid submitted successfully!');
      this.bids.push(response);
      this.bidAmount = 0;
      this.workTimeline = '';

      const modalEl = document.getElementById('bidModal');
      if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal?.hide();
      }
    },
    error: (error: any) => {

      if (error.status === 409 || error.error?.message?.includes('already placed')) {
        alert('You have already placed a bid for this job.');
      } else {
        console.error('Bid submission failed:', error);
        alert('An unexpected error occurred. Please contact support.');
      }
    },
  });
}


  hasBid(): boolean {
    return this.bids.some((bid) => bid.freelancer_id === this.userId);
  }

  updateStatus() {
    if (!this.job) return;

    let newStatus = '';
    if (this.job.status === 'Pending') {
      newStatus = 'In Progress';
    } else if (this.job.status === 'In Progress') {
      newStatus = 'Completed';
    } else if (this.job.status === 'Completed') {
      newStatus = 'Pending';
    }

    if (newStatus) {
      this.jobService.updateJobStatus(this.jobId, newStatus).subscribe({
        next: () => {
          if (this.job) this.job.status = newStatus;
          alert(`Job status updated to ${newStatus}`);
        },
        error: (err) => {
          console.error('Failed to update job status:', err);
          alert('Failed to update status. Please try again.');
        },
      });
    }
  }
}
