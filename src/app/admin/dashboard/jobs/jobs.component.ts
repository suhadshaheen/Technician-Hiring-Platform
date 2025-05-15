import { NgClass, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import {  JobDetailsComponent } from '../../../freelancer/job-search/job-details/job-details.component';
import { RouterLink, RouterModule } from '@angular/router';
@Component({
  selector: 'app-jobs',
  imports: [RouterModule,RouterLink, NgClass, NgForOf,JobDetailsComponent],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent {
  searchTerm: string = '';

  jobs = [
    { title: 'Electrician Needed', description: 'Fix house wiring and lighting issues.', location: 'Cairo', status: 'open' },
    { title: 'Plumber Required', description: 'Install and maintain plumbing systems.', location: 'Amman', status: 'open' },
    { title: 'Painter Wanted', description: 'Paint interior and exterior surfaces.', location: 'Riyadh', status: 'open' },
    { title: 'AC Technician', description: 'Install and repair air conditioning units.', location: 'Dubai', status: 'open' }
  ];

  filteredJobs = this.jobs;

  onSearch(event: any): void {
    const query = event.target.value.toLowerCase();
    this.filteredJobs = this.jobs.filter(job =>
      job.title.toLowerCase().includes(query) ||
      job.description.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query)
    );
  }

  updateStatus(job: any, newStatus: string): void {
    job.status = newStatus;
  }

  deleteJob(job: any): void {
    this.filteredJobs = this.filteredJobs.filter(j => j !== job);
    this.jobs = this.jobs.filter(j => j !== job);
  }
}