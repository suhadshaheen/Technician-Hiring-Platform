import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/Jobservice.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-freelancer-bids',
  imports: [CommonModule,RouterModule],
  templateUrl: './freelancer-bids.component.html',
    styleUrl: './freelancer-bids.component.css'
})
export class FreelancerBidsComponent implements OnInit {
  myBids: any[] = [];

  constructor(private jobService: JobService) {}

  ngOnInit() {
    const freelancerId = 101; //
    this.myBids = this.jobService.getMyBids(freelancerId);
  }
}
