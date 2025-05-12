import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgSwitchCase, NgSwitch, NgIf, NgSwitchDefault } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FreelancerSidebarComponent } from '../freelancer/freelancer-sidebar/freelancer-sidebar.component';
import { SidenavComponent } from '../admin/sidenav/sidenav.component';
import { OwnerSidebarComponent } from '../job-owner/owner-sidebar/owner-sidebar.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    RouterModule,
    NgSwitchCase,
    NgSwitchDefault,
    NgIf,
    NgSwitch,
    FreelancerSidebarComponent,
    SidenavComponent,
    OwnerSidebarComponent
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  isEditMode: boolean = false;
  role: string = 'admin';
  isCollapsed = false;

  profileImage: string | ArrayBuffer | null = 'assets/default.jpg';

  userData = {
    fullName: 'Suhad Shaheen',
    role: 'Developer',
    firstName: 'Suhad',
    lastName: 'Shaheen',
    username: 'Suhadsh.12',
    phone: '0595955264',
    whatsapp: '+972-595955264',
    email: 'suhadsh.12@gmail.com',
    city: 'Nablus',
    country: 'Palestine',
    about: 'Passionate technician with 5+ years of experience in electrical systems, maintenance, and home repairs.',
    skills: ['C++', 'Angular', 'React']
  };

  toggleEdit() {
    this.isEditMode = !this.isEditMode;
  }

  saveChanges() {
    this.userData.fullName = `${this.userData.firstName} ${this.userData.lastName}`;
    this.isEditMode = false;
    console.log('User data saved:', this.userData);
  }

  onSidebarToggle(state: boolean) {
    this.isCollapsed = state;
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  showPasswordForm = false;
  currentPassword = '';
  newPassword = '';
  confirmNewPassword = '';
  passwordChangeSuccess = '';
  passwordChangeError = '';

  togglePasswordForm() {
    this.showPasswordForm = !this.showPasswordForm;
    this.passwordChangeSuccess = '';
    this.passwordChangeError = '';
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmNewPassword = '';
  }

  changePassword() {
    const actualPassword = '123456';

    if (this.currentPassword !== actualPassword) {
      this.passwordChangeError = 'Current password is incorrect.';
      this.passwordChangeSuccess = '';
      return;
    }

    if (this.newPassword !== this.confirmNewPassword) {
      this.passwordChangeError = 'New passwords do not match.';
      this.passwordChangeSuccess = '';
      return;
    }

    if (this.newPassword.length < 6) {
      this.passwordChangeError = 'New password must be at least 6 characters.';
      this.passwordChangeSuccess = '';
      return;
    }

    this.passwordChangeSuccess = 'Password changed successfully!';
    this.passwordChangeError = '';
    this.togglePasswordForm();
  }
}
