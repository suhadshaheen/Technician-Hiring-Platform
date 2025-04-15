import { Component } from '@angular/core';
import {ForgotPasswordFormComponent} from '../forgot-password-form/forgot-password-form.component';
import {DecorativeCirclesComponent} from '../../login/decorative-circles/decorative-circles.component';
import {SignInCardComponent} from '../../sign-in/sign-in-card/sign-in-card.component';
import {LoginFormComponent} from '../../login/login-form/login-form.component';

@Component({
  selector: 'app-forgot-password-page',
  imports: [
    ForgotPasswordFormComponent,
    DecorativeCirclesComponent,

  ],
  templateUrl: './forgot-password-page.component.html',
  styleUrl: './forgot-password-page.component.css'
})
export class ForgotPasswordPageComponent {

}
