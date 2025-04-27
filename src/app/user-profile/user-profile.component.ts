import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-user-profile',
  imports: [FormsModule,NgFor,RouterModule,NgIf],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  isEditMode: boolean = false;

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
}
