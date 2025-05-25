import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SidebarServiceService } from '../../sidebar-service.service';
import {AuthService} from '../../user-roles-yousef/services/AuthService';
@Component({
  selector: 'app-owner-sidebar',
  imports: [CommonModule , RouterModule],
  templateUrl: './owner-sidebar.component.html',
  styleUrl: './owner-sidebar.component.css'
})
export class OwnerSidebarComponent implements OnInit {
  @Output() collapsedChange = new EventEmitter<boolean>();
  isCollapsed = false;

  constructor(private sidebarService: SidebarServiceService, private router: Router, private authService: AuthService) {
  }

  wasAutoCollapsed = false;

  ngOnInit() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize.bind(this));

    this.sidebarService.toggleSidebar$.subscribe(() => {
      if (window.innerWidth >= 768) {
        this.isCollapsed = !this.isCollapsed;
        this.wasAutoCollapsed = false;
        this.collapsedChange.emit(this.isCollapsed);
      }
    });
  }

  handleResize() {
    const width = window.innerWidth;

    if (width < 768 && !this.isCollapsed) {
      this.isCollapsed = true;
      this.wasAutoCollapsed = true;
      this.collapsedChange.emit(this.isCollapsed);
    } else if (width >= 992 && this.isCollapsed && this.wasAutoCollapsed) {
      this.isCollapsed = false;
      this.wasAutoCollapsed = false;
      this.collapsedChange.emit(this.isCollapsed);
    }
  }

  confirmSignOut() {
    this.router.navigate(['/login']);
  }

  onLogout() {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user'); // if stored
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('Logout failed');
      }
    });
  }
  confirmSignOutAndLogout() {
    this.confirmSignOut();
    this.onLogout();
  }
}
