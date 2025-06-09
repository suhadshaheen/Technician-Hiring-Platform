import { Routes } from '@angular/router';
import { SignInPageComponent } from './user-roles-yousef/sign-in/sign-in-page/sign-in-page.component';
import { LoginPageComponent } from './user-roles-yousef/login/login-page/login-page.component';
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
import { AdminComponent } from './admin/admin.component';
import { GuestComponent } from './guest/guest.component';
import { JobOwnerComponent } from './job-owner/job-owner.component';
import { FreelancerComponent } from './freelancer/freelancer.component';
import { FreelancerBidsComponent } from './freelancer/freelancer-bids/freelancer-bids.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FreelancerHomePageYComponent } from './freelancer/home-page-freelancer/home-page-y/home-page-y.component';
import { FreelancerProfileComponent } from './freelancer/freelancer-profile/freelancer-profile.component';
import { JobsComponent } from './admin/dashboard/jobs/jobs.component';
import { KeyGuard } from './user-roles-yousef/gurds/auth.guard';

export const routes: Routes = [
  { path: 'profile', component: UserProfileComponent, canActivate: [KeyGuard] },
  { path: 'dashboard', component: AdminLayoutComponent, canActivate: [KeyGuard] },
  { path: 'users', component: UsersComponent, canActivate: [KeyGuard] },
  { path: 'jobs', component: JobsComponent, canActivate: [KeyGuard] },
  { path: 'job-list', component: JopListComponent, canActivate: [KeyGuard] },
  { path: 'chat', component: ChatComponent, canActivate: [KeyGuard] },
  { path: 'PostPage', component: PostJobPageComponent, canActivate: [KeyGuard] },
  { path: 'Sign', component: SignInPageComponent },
  { path: 'Forgot-page', component: ForgotPasswordPageComponent },
  { path: 'adit', component: AditJobPageComponent, canActivate: [KeyGuard] },
  { path: '', component: GuestComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'Bids', component: JobBidsPageComponent, canActivate: [KeyGuard] },
  { path: 'OwnerJobs', component: OwnerJobsPageComponent, canActivate: [KeyGuard] },
  { path: 'job-details/:id', component: JobDetailsComponent,  },
  {
    path: 'admin', component: AdminComponent, canActivate: [KeyGuard],
    data: { role: 'admin' },
    children: [
      { path: 'dashboard', component: AdminLayoutComponent, canActivate: [KeyGuard] },
      { path: '', component: AdminLayoutComponent },
      { path: 'jobs', component: JobsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'job-details/:id', component: JobDetailsComponent },
      { path: 'freelancers/:id', component: FreelancerProfileComponent },
      { path: 'profile', component: UserProfileComponent },
    ]
  },
  {
    path: 'jobOwner', component: JobOwnerComponent, canActivate: [KeyGuard],
    data: { role: 'jobowner' },
    children: [
      { path: '', component: HomePageYComponent },
      { path: 'PostJob', component: PostJobPageComponent },
      { path: 'OwnerJobs', component: OwnerJobsPageComponent },
      { path: 'job-bids/:jobId', component: JobBidsPageComponent },
      { path: 'Edit/:id', component: AditJobPageComponent },
      { path: 'profile', component: UserProfileComponent },
      { path: 'chat/:freelancerId', component: ChatComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'job-details/:id', component: JobDetailsComponent },
      { path: 'freelancers/:id', component: FreelancerProfileComponent }
    ]
  },
  {
    path: 'freelancer', component: FreelancerComponent, canActivate: [KeyGuard],
    data: { role: 'freelancer' },
    children: [
      { path: '', component: FreelancerHomePageYComponent },
      { path: 'job-list', component: JopListComponent },
      { path: 'job-details/:id', component: JobDetailsComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'chat/:freelancerId', component: ChatComponent },
      { path: 'freelancer-bids', component: FreelancerBidsComponent },
      { path: 'profile', component: UserProfileComponent },
      {
        path: 'freelancers/:id',
        component: FreelancerProfileComponent
      }


    ]
  },

];

