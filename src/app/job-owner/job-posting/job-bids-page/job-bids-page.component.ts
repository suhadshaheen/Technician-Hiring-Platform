import { Component } from '@angular/core';
import { JobBidComponent } from './job-bid/job-bid.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-job-bids-page',
  imports: [JobBidComponent ,CommonModule],
  templateUrl: './job-bids-page.component.html',
  styleUrl: './job-bids-page.component.css'
})
export class JobBidsPageComponent {
   bids = [
    {id : 1 , name :'Mohammad' , date : '20 march 2025'},
    {id : 2 , name :'Samer' ,  date : '31 march 2025'},
    {id : 3 , name :'Eman' , date : '10 april 2025'},
  ];

  rejectBid(id: number) {
    this.bids = this.bids.filter(bid => bid.id !== id);
  }
}
