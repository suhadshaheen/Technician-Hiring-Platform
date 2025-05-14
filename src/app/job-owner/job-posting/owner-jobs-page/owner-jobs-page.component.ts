import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YourJobComponent } from './your-job/your-job.component';
@Component({
  selector: 'app-owner-jobs-page',
  imports: [CommonModule,YourJobComponent],
  templateUrl: './owner-jobs-page.component.html',
  styleUrl: './owner-jobs-page.component.css'
})
export class OwnerJobsPageComponent {
  jobs = [
    {id : 1 , title :'Fix Plumbing Issue'},
    {id : 2 , title :'Paint the Living Room'},
    {id : 3 , title :'Electrical Maintenance'},
  ];

  deleteJob(id: number) {
    this.jobs = this.jobs.filter(job => job.id !== id);
  }
}