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
                  const url = event.urlAfterRedirects || event.url;
                  this.isGuest = url === '/' || url.startsWith('/guest');
                });
                
              }

  onToggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
