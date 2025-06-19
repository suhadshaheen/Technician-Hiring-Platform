
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
import { CommonModule } from '@angular/common';
import { JobPhotoService } from '../../../../services/jobPhotos.service';
declare var bootstrap: any;


@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
  standalone: true,
  imports: [FormsModule, NgClass, NgForOf, NgIf, RouterModule,CommonModule],
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
  jobPhotos: { id: number; photo_path: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private bidService: BidService,
    private authService: AuthService,
    private jobPhotoService: JobPhotoService
  ) {}

  ngOnInit(): void {
  this.jobId = Number(this.route.snapshot.paramMap.get('id'));
  this.loadJob();

  this.userId = this.authService.getUserRoleId();
  this.userRole = this.authService.getUserRole();
}

  loadJob() {
    this.jobService.getJobById(this.jobId).subscribe({
      next: (data) => {
        this.job = data;

        if (this.job?.job_requirements) {
          try {

            const requirementsObj = JSON.parse(this.job.job_requirements);

            this.jobPoints = Object.values(requirementsObj).map(value => String(value));
          } catch (e) {

            console.warn('Failed to parse job requirements as JSON, treating as plain string.', e);
            this.jobPoints = this.job.job_requirements
              .split(',')
              .map(req => req.trim())
              .filter(req => req.length > 0);
          }
        } else {
          this.jobPoints = [];
        }


      this.loadJobPhotos();

      },
      error: (err) => {
        console.error('Failed to load job:', err);
      }
    });
  }
//doaa
  loadJobPhotos() {
    this.jobPhotoService.getPhotosByJobId(this.jobId).subscribe({
      next: (photos) => {
        this.jobPhotos = photos;
      },
      error: (err) => {
        console.error('Failed to load job photos:', err);
      }
    });
  }

  getPhotoUrl(photoPath?: string): string {
    if (!photoPath) {
      return 'assets/images/no-image.png';
    }
    return `http://127.0.0.1:8000/storage/${photoPath}`;
  }


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
  const existingModal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
  existingModal.hide();
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
    if (this.job.status === 'pending') {
      newStatus = 'in_progress';
    } else if (this.job.status === 'in_progress') {
      newStatus = 'completed';
    } else if (this.job.status === 'completed') {
      newStatus = 'pending';
    }

    if (newStatus) {
      this.jobService.updateJobStatus(this.jobId, newStatus).subscribe({
        next: () => {
          if (this.job) this.job.status = newStatus;
          alert(`Job status updated`);
        },
        error: (err) => {
          console.error('Failed to update job status:', err);
          alert('Failed to update status. Please try again.');
        },
      });
    }
  }
}
