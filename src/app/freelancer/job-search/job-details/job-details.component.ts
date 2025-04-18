import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JobService } from '../../services/Jobservice.service';

@Component({
  standalone: true,
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
  imports: [FormsModule, NgClass, NgForOf, NgIf, RouterModule]
})
export class JobDetailsComponent implements OnInit {
  jobId: number = 0;
  job: any = {};
  bidAmount: number = 0;
  workTimeline: string = '';
  bids: any[] = [];

  constructor(private route: ActivatedRoute, private jobService: JobService) {}

  ngOnInit(): void {
    this.jobId = Number(this.route.snapshot.paramMap.get('id'));
    this.job = this.jobService.getJobById(this.jobId);
    this.bids = this.job.bids || [];
  }

  onSubmitBid() {
    const newBid = {
      name: 'Freelancer 3',
      amount: this.bidAmount,
      workTimeline: this.workTimeline
    };
    this.bids.push(newBid);
    if (!this.job.bids) {
      this.job.bids = [];
    }
    this.job.bids.push(newBid);

    // Reset form inputs
    this.bidAmount = 0;
    this.workTimeline = '';
  }

  updateStatus() {
    if (this.job.status === 'Pending') {
      this.job.status = 'In Progress';
    } else if (this.job.status === 'In Progress') {
      this.job.status = 'Completed';
    } else if (this.job.status === 'Completed') {
      this.job.status = 'Pending';
    }
  }
}
