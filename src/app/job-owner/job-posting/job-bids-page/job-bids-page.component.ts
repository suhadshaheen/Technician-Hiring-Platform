// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { JobService } from '../../../../services/Jobservice.service';
// import { JobBidComponent } from './job-bid/job-bid.component';
// import { CommonModule } from '@angular/common';
// import { BidService } from '../../../../services/Bid.service';
// @Component({
//   selector: 'app-job-bids-page',
//   standalone: true,
//   imports: [CommonModule, JobBidComponent],
//   templateUrl: './job-bids-page.component.html',
//   styleUrls: ['./job-bids-page.component.css']
// })
// export class JobBidsPageComponent implements OnInit {
//   bids: any[] = [];
//   jobId!: number;

//   constructor(private jobService: JobService,private bidService: BidService, private route: ActivatedRoute) {}

//   ngOnInit(): void {
//     this.jobId = Number(this.route.snapshot.paramMap.get('jobId'));
//     if (this.jobId) {
//       this.loadBids();
//     } else {
//       console.error('No jobId provided in route.');
//     }
//   }

//   loadBids() {
//     this.jobService.getJobBids(this.jobId).subscribe({
//       next: (data) => {
//         this.bids = data;
//       },
//       error: (err) => {
//         console.error('Failed to load bids', err);
//       }
//     });
//   }

// //   approveBid(bidId: number) {
// //     console.log('Approving bid with ID:', bidId);
// //     // يمكنك هنا استدعاء service لتأكيد الموافقة إذا رغبت
// //   }

// //   rejectBid(bidId: number) {
// //   const bid = this.bids.find(b => b.id === bidId);
// //   if (bid) {
// //     bid.status = 'rejected';  // تحديث الحالة بدل الحذف
// //   }
// // }

// approveBid(bidId: number) {
//     this.bidService.changeBidStatus(bidId, 'accepted').subscribe({
//       next: () => {
//         const bid = this.bids.find(b => b.id === bidId);
//         if (bid) {
//           bid.status = 'accepted'; // تحديث الحالة في الواجهة بعد نجاح الطلب
//         }
//       },
//       error: (err) => {
//         console.error('Failed to approve bid', err);
//       }
//     });
//   }

//   rejectBid(bidId: number) {
//     this.bidService.changeBidStatus(bidId, 'rejected').subscribe({
//       next: () => {
//         const bid = this.bids.find(b => b.id === bidId);
//         if (bid) {
//           bid.status = 'rejected';  // تحديث الحالة بدل الحذف
//         }
//       },
//       error: (err) => {
//         console.error('Failed to reject bid', err);
//       }
//     });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../../../../services/Jobservice.service';
import { JobBidComponent } from './job-bid/job-bid.component';
import { CommonModule } from '@angular/common';
import { BidService } from '../../../../services/Bid.service';

@Component({
  selector: 'app-job-bids-page',
  standalone: true,
  imports: [CommonModule, JobBidComponent],
  templateUrl: './job-bids-page.component.html',
  styleUrls: ['./job-bids-page.component.css']
})
export class JobBidsPageComponent implements OnInit {
  bids: any[] = [];
  jobId!: number;
  job: any = {}; 

  constructor(
    private jobService: JobService,
    private bidService: BidService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.jobId = Number(this.route.snapshot.paramMap.get('jobId'));
    if (this.jobId) {
      this.loadJobAndBids();
    } else {
      console.error('No jobId provided in route.');
    }
  }

  loadJobAndBids() {
    this.jobService.getJobById(this.jobId).subscribe({
      next: (jobData) => {
        this.job = jobData;

        this.jobService.getJobBids(this.jobId).subscribe({
          next: (bidsData) => {
            this.bids = bidsData;
          },
          error: (err) => {
            console.error('Failed to load bids', err);
          }
        });
      },
      error: (err) => {
        console.error('Failed to load job details', err);
      }
    });
  }

  approveBid(bidId: number) {
    this.bidService.changeBidStatus(bidId, 'accepted').subscribe({
      next: () => {
        const bid = this.bids.find(b => b.id === bidId);
        if (bid) {
          bid.status = 'accepted';
        }
      },
      error: (err) => {
        console.error('Failed to approve bid', err);
      }
    });
  }

  rejectBid(bidId: number) {
    this.bidService.changeBidStatus(bidId, 'rejected').subscribe({
      next: () => {
        const bid = this.bids.find(b => b.id === bidId);
        if (bid) {
          bid.status = 'rejected';
        }
      },
      error: (err) => {
        console.error('Failed to reject bid', err);
      }
    });
  }
}
