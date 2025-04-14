import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


import {LoginPageComponent} from './user-roles-yousef/login/login-page/login-page.component';
import {HomePageYComponent} from './home-page-yousef/home-page-y/home-page-y.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginPageComponent, HomePageYComponent ,SidenavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'thp-platform';
}
