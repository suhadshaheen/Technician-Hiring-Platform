import { Component } from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';


import {LoginPageComponent} from './user-roles-yousef/login/login-page/login-page.component';
import {HomePageYComponent} from './job-owner/home-page-owner/home-page-y/home-page-y.component';
import { SidenavComponent } from './admin/sidenav/sidenav.component';
import {NgIf, NgStyle} from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,  NgIf,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'thp-platform';
  // constructor(public router: Router) {}
  // isAuthRoute(): boolean {
  //   const authRoutes = ['/login', '/Sign', '/Forgot-page'];
  //   return authRoutes.includes(this.router.url);}

  //   isSidebarCollapsed = false;

  //   handleSidebarToggle() {
  //   this.isSidebarCollapsed = !this.isSidebarCollapsed;
  // }
authRoutes = ['/login', '/Sign', '/Forgot-page'];
showNavbar = true;

constructor(public router: Router) {
  this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      this.showNavbar = !this.authRoutes.includes(event.urlAfterRedirects);
    });
  const token = localStorage.getItem('token');
  const currentUrl = new URL(window.location.href);
  const hasKey = currentUrl.searchParams.get('key');

  if (token && !hasKey) {
    const pathname = currentUrl.pathname;


    this.router.navigateByUrl(`${pathname}?key=${token}`);
  }
}

    isSidebarCollapsed = false;

    handleSidebarToggle() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
   }
}
