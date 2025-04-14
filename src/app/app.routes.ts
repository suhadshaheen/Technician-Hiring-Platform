import { Routes } from '@angular/router';
import {SignInPageComponent} from '../User Roles & Authentication-yousef/Sign-in/sign-in-page/sign-in-page.component';
import {LoginPageComponent} from '../User Roles & Authentication-yousef/Login/login-page/login-page.component';
import {
  ForgotPasswordPageComponent
} from '../User Roles & Authentication-yousef/Forgot-password/forgot-password-page/forgot-password-page.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { PostJobPageComponent } from './job-posting-doaa/post-job-page/post-job-page.component';
import { AditJobPageComponent } from './job-posting-doaa/adit-job-page/adit-job-page.component';
export const routes: Routes = [
  {path: 'PostPage' , component:PostJobPageComponent},
  {path: 'Sign' , component:SignInPageComponent},
  {path:'Forgot-page' ,component:ForgotPasswordPageComponent},
  {path: '' , component:AditJobPageComponent}
];

