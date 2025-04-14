import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {LoginPageComponent} from '../User Roles & Authentication-yousef/Login/login-page/login-page.component';
import {HomePageYComponent} from '../home-page-yousef/home-page-y/home-page-y.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginPageComponent, HomePageYComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'thp-platform';
}
