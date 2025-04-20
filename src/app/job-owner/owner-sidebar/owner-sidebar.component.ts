import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarServiceService } from '../../sidebar-service.service';
@Component({
  selector: 'app-owner-sidebar',
  imports: [CommonModule , RouterModule],
  templateUrl: './owner-sidebar.component.html',
  styleUrl: './owner-sidebar.component.css'
})
export class OwnerSidebarComponent implements OnInit{
  @Output() collapsedChange = new EventEmitter<boolean>();
  isCollapsed = false;

  constructor(private sidebarService: SidebarServiceService) {}

  ngOnInit() {
    this.sidebarService.toggleSidebar$.subscribe(() => {
      this.isCollapsed = !this.isCollapsed;
      this.collapsedChange.emit(this.isCollapsed);
    });
  }

}