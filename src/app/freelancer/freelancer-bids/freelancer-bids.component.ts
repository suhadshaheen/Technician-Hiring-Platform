import {Component, Input, OnInit} from '@angular/core';
import { BidService } from '../../../services/Bid.service';
import { AuthService } from '../../user-roles-yousef/services/AuthService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-freelancer-bids',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './freelancer-bids.component.html',
  styleUrls: ['./freelancer-bids.component.css']
})
export class FreelancerBidsComponent implements OnInit {
  myBids: any[] = [];
  @Input() maxBids: number | null = null;

  get visibleBids() {
    return this.maxBids ? this.myBids.slice(0, this.maxBids) : this.myBids;
  }

  constructor(
    private bidService: BidService,
    private authService: AuthService
  ) {}

ngOnInit() {
  this.bidService.getMyBids().subscribe({
    next: (bids) => {
      this.myBids = bids;
    },
    error: (err) => {
      console.error('Failed to load bids:', err);
    }
  });
}



}
