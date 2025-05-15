import { NgClass, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { FreelancerProfileComponent} from '../../../freelancer/freelancer-profile/freelancer-profile.component';

@Component({
  selector: 'app-users',
  imports:[NgClass,NgForOf,RouterModule,FreelancerProfileComponent,RouterLink],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  searchTerm: string = '';

  artisans = [
    { name: 'Ahmed Khaled', skill: 'Electrician', location: 'Cairo', status: 'pending' },
    { name: 'Fatima Nour', skill: 'Plumber', location: 'Amman', status: 'pending' },
    { name: 'Mohammed Zain', skill: 'Painter', location: 'Riyadh', status: 'pending' },
    { name: 'Layla Hassan', skill: 'Carpenter', location: 'Beirut', status: 'pending' },
    { name: 'Omar Fathi', skill: 'AC Technician', location: 'Dubai', status: 'pending' }
  ];

  filteredArtisans = this.artisans;

  onSearch(event: any): void {
    const query = event.target.value.toLowerCase();
    this.filteredArtisans = this.artisans.filter(artisan =>
      artisan.name.toLowerCase().includes(query) ||
      artisan.skill.toLowerCase().includes(query) ||
      artisan.location.toLowerCase().includes(query)
    );
  }

  updateStatus(artisan: any, newStatus: string): void {
    artisan.status = newStatus;
  }
}