import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';


import {LoginPageComponent} from './user-roles-yousef/login/login-page/login-page.component';
import {HomePageYComponent} from './home-page-yousef/home-page-y/home-page-y.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import {NgIf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginPageComponent, HomePageYComponent, SidenavComponent, NgStyle, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'thp-platform';
  constructor(public router: Router) {}
  isAuthRoute(): boolean {
    const authRoutes = ['/login', '/Sign', '/Forgot-page'];
    return authRoutes.includes(this.router.url);}
}
