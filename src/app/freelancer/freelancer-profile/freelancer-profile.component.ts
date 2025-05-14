import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-freelancer-profile',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './freelancer-profile.component.html',
  styleUrls: ['./freelancer-profile.component.css']
})
export class FreelancerProfileComponent {
  profileImage: string | ArrayBuffer | null = 'assets/default.jpg';

  userData = {
    fullName: 'Suhad Shaheen',
    role: 'Freelancer',
    username: 'Suhadsh.12',
    phone: '0595955264',
    email: 'suhadsh.12@gmail.com',
    city: 'Nablus',
    country: 'Palestine',
    about: 'Passionate technician with 5+ years of experience in electrical systems, maintenance, and home repairs.',
    skills: ['C++', 'Angular', 'React']
  };
}
