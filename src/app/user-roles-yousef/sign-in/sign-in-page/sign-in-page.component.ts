import { Component } from '@angular/core';
import {DecorativeCirclesComponent} from '../../login/decorative-circles/decorative-circles.component';
import {SignInCardComponent} from '../sign-in-card/sign-in-card.component';
import {SignInCirclesComponent} from '../sign-in-circles/sign-in-circles.component';

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [
    DecorativeCirclesComponent,
    SignInCardComponent,
    SignInCirclesComponent
  ],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.css'
})
export class SignInPageComponent {

}
