import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../../user-roles-yousef/services/User';
import { User } from '../../../models/User';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-freelancer-profile',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule],
  templateUrl: './freelancer-profile.component.html',
  styleUrls: ['./freelancer-profile.component.css']
})
export class FreelancerProfileComponent implements OnInit {
  freelancerProfile: User | null = null; //for fl

  averageRating: number | null = null;
  ratingCount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const freelancerId = params.get('id');
      if (freelancerId) {
        const id = Number(freelancerId);
        this.getFreelancerProfile(Number(freelancerId));
        this.loadFreelancerRating(id);
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

  loadFreelancerRating(freelancerId: number) {
    this.http.get<any>(`http://127.0.0.1:8000/api/freelancer-ratings/${freelancerId}`)
  .subscribe({
    next: (data) => {
      this.averageRating = data.average_rating;
      this.ratingCount = data.rating_count;
    },

        error: (err) => {
          console.error('Failed to load freelancer rating', err);
        }
      });
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

  getStarsArray(): number[] {
    return [1, 2, 3, 4, 5];
  }
  roundRating(rating: number | null): number {
  return rating !== null ? Math.round(rating) : 0;
}

}
