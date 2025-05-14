import { Component, OnInit } from '@angular/core';
import { SidebarServiceService } from '../sidebar-service.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule , NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  isSidebarCollapsed = false;
  isGuest = false;
  isFreelancer = false;
  isJobOwner = false;
  isAdmin = false;

  constructor(private sidebarService: SidebarServiceService,
              private router: Router
              ) {}

              ngOnInit(): void {
                this.sidebarService.toggleSidebar$.subscribe(() => {
                  this.isSidebarCollapsed = !this.isSidebarCollapsed;
                });
                this.router.events.pipe(
                  filter(event => event instanceof NavigationEnd)
                ).subscribe((event: NavigationEnd) => {
                    this.updateGuestStatus(event.urlAfterRedirects || event.url);
                });
                this.updateGuestStatus(this.router.url);
              }

              updateGuestStatus(url: string): void {
                 const guestPaths = ['/', '/login', '/register', '/forgot-password'];
                 this.isGuest = guestPaths.includes(url) || url.startsWith('/home');
              }
              onToggleSidebar() {
                this.sidebarService.toggleSidebar();
            }
}
