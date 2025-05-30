import { Component , Input, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-job-bid',
  imports: [CommonModule , RouterModule],
  templateUrl: './job-bid.component.html',
  styleUrl: './job-bid.component.css'
})
export class JobBidComponent {
  @Input() name!: string ;
  @Input() date!: string ;
  @Input() bidId!: number;
  @Input() freelancerId: any;
  @Output() delete = new EventEmitter<number>();
  approve() {
    // this.edit.emit();
  }
  canEdit(){
    
  }
  reject() {
     this.delete.emit(this.bidId);
  }

}
