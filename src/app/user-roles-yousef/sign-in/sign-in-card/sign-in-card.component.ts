import { Component } from '@angular/core';
import {SignInFormComponent} from '../sign-in-form/sign-in-form.component';
import {SocialSignInComponent} from '../../../../User Roles & Authentication-yousef/Sign-in/social-sign-in/social-sign-in.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-sign-in-card',
  imports: [
    SignInFormComponent,
    SocialSignInComponent,
    RouterLink
  ],
  templateUrl: './sign-in-card.component.html',
  styleUrl: './sign-in-card.component.css'
})
export class SignInCardComponent {

}
