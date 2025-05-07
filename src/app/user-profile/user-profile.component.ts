import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgSwitchCase } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { FreelancerSidebarComponent } from '../freelancer/freelancer-sidebar/freelancer-sidebar.component';
import { SidenavComponent } from '../admin/sidenav/sidenav.component';
import { OwnerSidebarComponent } from '../job-owner/owner-sidebar/owner-sidebar.component';
import { NgSwitch } from '@angular/common';
import { NgSwitchDefault } from '@angular/common';
@Component({
  selector: 'app-user-profile',
  imports: [FormsModule,NgFor,RouterModule,NgSwitchCase,NgSwitchDefault,NgIf,FreelancerSidebarComponent,NgSwitch,SidenavComponent,OwnerSidebarComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  isEditMode: boolean = false;
  role: string = 'admin';
  userData = {
    fullName: 'Suhad Shaheen',
    role: 'Developer',
    firstName: 'Suhad',
    lastName: 'Shaheen',
    username: 'Suhadsh.12',
    phone: '0595955264',
    whatsapp: '+972-595955264',
    email: 'suhadsh.12@gmail.come',
    city: 'Nablus',
    country: 'palestine',
    about: 'Passionate technician with 5+ years of experience in electrical systems, maintenance, and home repairs.',
    skills: [
      { name: 'c++', percent: 80 },
      { name: 'Angular', percent: 70 },
      { name: 'react', percent: 40},
    ]
  };

  toggleEdit() {
    this.isEditMode = !this.isEditMode;
  }

  saveChanges() {
    this.isEditMode = false;
    console.log('User data saved:', this.userData);
  }
  isCollapsed = false;

  onSidebarToggle(state: boolean) {
    this.isCollapsed = state;
  }
}
