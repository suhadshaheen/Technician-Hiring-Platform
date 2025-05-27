import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router'; // لجلب الـ ID من الـ URL
import { UserService } from '../../user-roles-yousef/services/User';
import { User } from '../../../models/User';

@Component({
  selector: 'app-freelancer-profile',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule],
  templateUrl: './freelancer-profile.component.html',
  styleUrls: ['./freelancer-profile.component.css']
})
export class FreelancerProfileComponent implements OnInit {
  freelancerProfile: User | null = null; //for fl

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      const freelancerId = params.get('id');
      if (freelancerId) {
        this.getFreelancerProfile(Number(freelancerId));
      } else {
        console.error('Freelancer ID not found in route parameters. Please provide an ID in the URL.');

      }
    });
  }

  getFreelancerProfile(id: number): void {
    this.userService.getUser(id).subscribe(
      (user: User) => {
        this.freelancerProfile = user;
        console.log('Freelancer Profile:', this.freelancerProfile);
      },
      error => {
        console.error('Error fetching freelancer profile:', error);

        this.freelancerProfile = null;
      }
    );
  }

  get skillsArray(): string[] {
    return this.freelancerProfile?.profile?.skills
      ? this.freelancerProfile.profile.skills.split(',').map(skill => skill.trim()).filter(skill => skill !== '')
      : [];
  }


  getProfileImageUrl(): string {
    if (this.freelancerProfile?.profile?.User_photo) {
      return `http://127.0.0.1:8000/storage/${this.freelancerProfile.profile.User_photo}`;
    }
    return 'assets/default.jpg';
  }
}
