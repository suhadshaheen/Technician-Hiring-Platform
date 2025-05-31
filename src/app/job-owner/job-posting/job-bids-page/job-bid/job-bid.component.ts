import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-job-bid',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './job-bid.component.html',
  styleUrl: './job-bid.component.css'
})
export class JobBidComponent {
  @Input() name!: string;
  @Input() date: string | null = null;
  @Input() freelancerId!: number;
  @Input() bidId!: number;
  @Input() canEdit: boolean = false;
  @Input() status: 'pending' | 'approved' | 'rejected' | 'accepted' = 'pending';

  @Output() approveBid = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  approve() {
    this.status = 'accepted'; // ✅ تحديث الحالة داخليًا
    this.approveBid.emit(this.bidId);
  }

  reject() {
    this.status = 'rejected'; // ✅ تحديث الحالة داخليًا
    this.delete.emit(this.bidId);
  }
}
