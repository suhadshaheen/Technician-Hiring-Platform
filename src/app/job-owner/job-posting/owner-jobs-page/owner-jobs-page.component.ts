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
    {id : 1 , title :'job 1'},
    {id : 2 , title :'job 2'},
    {id : 3 , title :'job 3'},
  ];
}