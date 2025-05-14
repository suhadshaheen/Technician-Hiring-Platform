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
  imports: [RouterOutlet, LoginPageComponent, HomePageYComponent, SidenavComponent, NgStyle, NgIf,NavbarComponent],
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
}

    isSidebarCollapsed = false;

    handleSidebarToggle() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
   }
}
