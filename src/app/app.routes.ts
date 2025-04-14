import { Routes } from '@angular/router';
import {SignInPageComponent} from '../User Roles & Authentication-yousef/Sign-in/sign-in-page/sign-in-page.component';
import {LoginPageComponent} from '../User Roles & Authentication-yousef/Login/login-page/login-page.component';
import {
  ForgotPasswordPageComponent
} from '../User Roles & Authentication-yousef/Forgot-password/forgot-password-page/forgot-password-page.component';

export const routes: Routes = [

  {path: 'Sign' , component:SignInPageComponent},
  {path:'Forgot-page' ,component:ForgotPasswordPageComponent}
];

