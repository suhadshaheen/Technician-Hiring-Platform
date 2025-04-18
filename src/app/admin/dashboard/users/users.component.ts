import { NgClass, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [NgForOf,NgClass,RouterModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  searchTerm: string = '';
  
  artisans = [
    { name: 'Ahmed Khaled', skill: 'Electrician', location: 'Cairo', status: 'approved' },
    { name: 'Fatima Nour', skill: 'Plumber', location: 'Amman', status: 'pending' },
    { name: 'Mohammed Zain', skill: 'Painter', location: 'Riyadh', status: 'rejected' },
    { name: 'Layla Hassan', skill: 'Carpenter', location: 'Beirut', status: 'approved' },
    { name: 'Omar Fathi', skill: 'AC Technician', location: 'Dubai', status: 'pending' },
    { name: 'Ahmed Khaled', skill: 'Electrician', location: 'Cairo', status: 'approved' },
    { name: 'Fatima Nour', skill: 'Plumber', location: 'Amman', status: 'pending' },
    { name: 'Mohammed Zain', skill: 'Painter', location: 'Riyadh', status: 'rejected' },
    { name: 'Layla Hassan', skill: 'Carpenter', location: 'Beirut', status: 'approved' },
    { name: 'Omar Fathi', skill: 'AC Technician', location: 'Dubai', status: 'pending' },
    { name: 'Ahmed Khaled', skill: 'Electrician', location: 'Cairo', status: 'approved' },
    { name: 'Fatima Nour', skill: 'Plumber', location: 'Amman', status: 'pending' },
    { name: 'Mohammed Zain', skill: 'Painter', location: 'Riyadh', status: 'rejected' },
    { name: 'Layla Hassan', skill: 'Carpenter', location: 'Beirut', status: 'approved' },
    { name: 'Omar Fathi', skill: 'AC Technician', location: 'Dubai', status: 'pending' },
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
}



