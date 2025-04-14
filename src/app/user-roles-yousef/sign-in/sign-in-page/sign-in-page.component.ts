import { Component } from '@angular/core';
import {DecorativeCirclesComponent} from '../../login/decorative-circles/decorative-circles.component';
import {SignInCardComponent} from '../sign-in-card/sign-in-card.component';

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [
    DecorativeCirclesComponent,
    SignInCardComponent
  ],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.css'
})
export class SignInPageComponent {

}
