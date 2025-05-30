import { Component , Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Modal } from 'bootstrap';
@Component({
  selector: 'app-your-job',
  imports: [RouterModule],
  templateUrl: './your-job.component.html',
  styleUrl: './your-job.component.css'
})
export class YourJobComponent {
  @Input() title!: string ;
  @Input() jobId!: number;
  @Input() canEdit: boolean = true;
  @Input() job: any;
  @Input() freelancerId: any;
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<number>();
  @Output() bids = new EventEmitter<void>();

  onEdit() {
    this.edit.emit();
  }
   constructor(private el: ElementRef) {}

  confirmDelete() {
    const modalEl = this.el.nativeElement.querySelector(`#deleteConfirmModal${this.jobId}`);
    if (modalEl) {
      const modal = window.bootstrap?.Modal.getInstance(modalEl) || new window.bootstrap.Modal(modalEl);
      modal.hide();
    }

    this.delete.emit(this.jobId);
  }


}
