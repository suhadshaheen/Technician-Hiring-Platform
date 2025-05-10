import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-freelancer-profile',
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './freelancer-profile.component.html',
  styleUrl: './freelancer-profile.component.css'
})
export class FreelancerProfileComponent implements OnInit {
  userData: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.userData = {
      fullName: 'Suhad Shaheen',
      role: 'freelancer',
      username: 'suhadsh.12',
      phone: '0595955264',
      email: 'suhadsh.12@gmail.com',
      city: 'Nablus',
      country: 'Palestine',
      about: 'Experienced electrician with 5+ years in home installations and systems.',
      skills: [
        { name: 'c++', percent: 80 },
        { name: 'Angular', percent: 70 },
        { name: 'Laravel', percent: 60 }
      ]
    };
  }
}
