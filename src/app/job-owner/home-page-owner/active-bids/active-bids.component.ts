import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-active-bids',
  templateUrl: './active-bids.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./active-bids.component.css']
})
export class ActiveBidsComponent implements OnInit {
  jobPosts: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('ActiveBidsComponent initialized');
    this.loadMyJobs();
  }


  loadMyJobs(): void {
    const userId = localStorage.getItem('userId');
    console.log('userId:', userId);
    this.http.get<any[]>(`http://127.0.0.1:8000/api/users/${userId}/jobs`).subscribe({
      next: (res) => {
        this.jobPosts = res;
      },
      error: (err) => {
        console.error('Failed to fetch jobs:', err);
      }
    });
  }

  confirmDelete(jobId: number): void {
    this.jobPosts = this.jobPosts.filter(j => j.id !== jobId);
    // You can also add: this.http.delete(...) to hit the backend if you want
  }

}
