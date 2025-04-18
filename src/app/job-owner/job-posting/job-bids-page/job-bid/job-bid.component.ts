import { Component , Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-job-bid',
  imports: [],
  templateUrl: './job-bid.component.html',
  styleUrl: './job-bid.component.css'
})
export class JobBidComponent {
  @Input() title: string = '';
  @Input() date: string = '';
  @Input() canEdit: boolean = true;

  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() bids = new EventEmitter<void>();

  approve() {
    // this.edit.emit();
  }

  reject() {
    // this.delete.emit();
  }

}
