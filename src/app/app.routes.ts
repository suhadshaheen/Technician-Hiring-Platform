import { Routes } from '@angular/router';
import {SignInPageComponent} from './user-roles-yousef/sign-in/sign-in-page/sign-in-page.component';
import {LoginPageComponent} from './user-roles-yousef/login/login-page/login-page.component';
import {
  ForgotPasswordPageComponent
} from './user-roles-yousef/Forgot-password/forgot-password-page/forgot-password-page.component';
import { PostJobPageComponent } from './job-owner/job-posting/post-job-page/post-job-page.component';
import { AditJobPageComponent } from './job-owner/job-posting/adit-job-page/adit-job-page.component';
import { JopListComponent } from './freelancer/job-search/jop-list/jop-list.component';
import { JobDetailsComponent } from './freelancer/job-search/job-details/job-details.component';
import { ChatComponent } from './freelancer/job-search/chat/chat.component';
import { HomePageYComponent } from './job-owner/home-page-owner/home-page-y/home-page-y.component';
import { JobBidsPageComponent } from './job-owner/job-posting/job-bids-page/job-bids-page.component';
import { OwnerJobsPageComponent } from './job-owner/job-posting/owner-jobs-page/owner-jobs-page.component';
import { AdminLayoutComponent } from './admin/dashboard/admin-layout/admin-layout.component';
import { UsersComponent } from './admin/dashboard/users/users.component';
import {FreelancerHomePageYComponent} from './freelancer/home-page-freelancer/home-page-y/home-page-y.component';
import {GuestHomePageYComponent} from './guest/home-page-guest/home-page-y/home-page-y.component';

export const routes: Routes = [
  {path:'dashboard',component:AdminLayoutComponent},
  {path:'users',component:UsersComponent},
  { path: 'job-list', component: JopListComponent },
  { path: 'job-details/:id', component: JobDetailsComponent },
  {path: 'chat',component: ChatComponent,},
  {path: 'PostPage' , component:PostJobPageComponent},
  {path: 'Sign' , component:SignInPageComponent},
  {path:'Forgot-page' ,component:ForgotPasswordPageComponent},
  {path: 'adit' , component:AditJobPageComponent},
  {path:'',component:HomePageYComponent},
  {path:'login',component:LoginPageComponent},
  {path: 'Bids', component:JobBidsPageComponent},
  {path:'OwnerJobs', component:OwnerJobsPageComponent},
  {path: 'FreelancerHome', component:FreelancerHomePageYComponent},
  {path: 'GuestHomePage', component:GuestHomePageYComponent},
];

