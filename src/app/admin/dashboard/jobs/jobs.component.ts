import { CommonModule, NgClass, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { JobDetailsComponent } from '../../../freelancer/job-search/job-details/job-details.component';
import { RouterLink, RouterModule } from '@angular/router';
import { JobsService } from '../../../../services/adminJob.service';

@Component({
  selector: 'app-jobs',
  imports: [RouterModule, RouterLink, NgClass, NgForOf, JobDetailsComponent, NgIf, CommonModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent implements OnInit {
  searchTerm: string = '';
  jobs: any[] = [];
  filteredJobs: any[] = [];
  message: string = '';
  errorMessage: string = '';
  newJobs: any[] = [];

  constructor(private jobsService: JobsService) { }
  ngOnInit(): void {
    this.jobsService.getJobs().subscribe(data => {
      this.jobs = data;
      this.filteredJobs = data;
       const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        this.jobs.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
        this.newJobs = this.jobs.filter(a => new Date(a.created_at) >= oneWeekAgo);
    }
  );
  }
  onSearch(event: any): void {
    const query = event.target.value.toLowerCase();
    this.filteredJobs = this.jobs.filter(job =>
      job.title.toLowerCase().includes(query) ||
      job.description.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query)
    );
  }




  updateStatus(job: any, newStatus: string): void {
    this.jobsService.updateJobStatus(job.id, newStatus).subscribe({
      next: () => {
        job.status = newStatus;
        this.message = 'Job status updated successfully.';
      },
      error: (err) => {
        this.errorMessage = 'Failed to update job status.';
        console.error('Error updating status:', err);
      }
    });
  }

  deleteJob(job: any): void {
    const confirmed = window.confirm('Are you sure you want to delete this job?');
    if (!confirmed) return;

    this.jobsService.deleteJob(job.id).subscribe({
      next: () => {
        this.jobs = this.jobs.filter(j => j.id !== job.id);
        this.filteredJobs = this.filteredJobs.filter(j => j.id !== job.id);
        this.message = 'Job deleted successfully.';
      },
      error: (err) => {
        this.errorMessage = 'Failed to delete job.';
        console.error('Error deleting job:', err);
      }
    });
  }
}   