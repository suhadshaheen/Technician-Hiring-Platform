import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YourJobComponent } from './your-job/your-job.component';
import { JobService } from '../../../../services/Jobservice.service';
@Component({
  selector: 'app-owner-jobs-page',
  imports: [CommonModule,YourJobComponent],
  templateUrl: './owner-jobs-page.component.html',
  styleUrl: './owner-jobs-page.component.css'
})
export class OwnerJobsPageComponent implements OnInit {
  jobs : any [] = [];
  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.jobService.getMyJobs().subscribe({
      next: (data) => this.jobs = data,
      error: (err) => console.error('Failed to load jobs', err)
    });
  }

  deleteJob(jobId: number): void {
    this.jobService.deleteJob(jobId).subscribe({
    next: () => {
      this.jobs = this.jobs.filter(job => job.id !== jobId);
    },
    error: (err) => {
      console.error('Failed to delete job', err);
    }
  });
  }
}