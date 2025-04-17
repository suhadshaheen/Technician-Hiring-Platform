import { Component } from '@angular/core';
import {SocialLoginComponent} from '../social-login/social-login.component';
import {LoginFormComponent} from '../login-form/login-form.component';
import { RouterModule } from '@angular/router';
import {SignInPageComponent} from '../../sign-in/sign-in-page/sign-in-page.component';

@Component({
  selector: 'app-login-card',
  imports: [
    SocialLoginComponent,
    LoginFormComponent,
    RouterModule
  ],
  templateUrl: './login-card.component.html',
  styleUrl: './login-card.component.css'
})
export class LoginCardComponent {


}
