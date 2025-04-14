import { Component } from '@angular/core';
import {DecorativeCirclesComponent} from '../decorative-circles/decorative-circles.component';
import {LoginCardComponent} from '../login-card/login-card.component';

@Component({
  selector: 'app-login-page',
  imports: [
    DecorativeCirclesComponent,
    LoginCardComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

}
