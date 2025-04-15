import { Component , Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-your-job',
  imports: [RouterModule],
  templateUrl: './your-job.component.html',
  styleUrl: './your-job.component.css'
})
export class YourJobComponent {
  @Input() title: string = '';
  @Input() canEdit: boolean = true;

  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() bids = new EventEmitter<void>();

  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }

}
