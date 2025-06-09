import { CommonModule, NgClass, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { FreelancerProfileComponent } from '../../../freelancer/freelancer-profile/freelancer-profile.component';
import { AdminArtisanService, Artisan } from '../../../../services/adminArtisan.service';

@Component({
  selector: 'app-users',
  imports: [NgClass, NgForOf, RouterModule, FreelancerProfileComponent, RouterLink, CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  searchTerm: string = '';
  artisans: Artisan[] = [];
  filteredArtisans: Artisan[] = [];
  newArtisans: Artisan[] = [];

  constructor(private artisanService: AdminArtisanService) { }

  ngOnInit(): void {
    this.loadArtisans();
  }

  loadArtisans(): void {
    this.artisanService.getArtisans().subscribe({
      next: (artisans) => {
        this.artisans = artisans;

        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        this.artisans.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        this.newArtisans = artisans.filter(a => new Date(a.created_at) >= oneWeekAgo);

        this.filteredArtisans = [...this.artisans];

      },
      error: (error) => {
        console.error('Error loading artisans:', error);
      }
    });
  }

  onSearch(event: any): void {
    const query = event.target.value.trim().toLowerCase();
    if (!query) {
      this.filteredArtisans = [...this.artisans];
      return;
    }

    this.artisanService.searchArtisans(query).subscribe({
      next: (results) => {
        this.filteredArtisans = results;
      },
      error: (error) => {
        console.error('Search error:', error);
        this.filteredArtisans = this.artisans.filter(artisan =>
          artisan.firstname.toLowerCase().includes(query) ||
          artisan.lastname.toLowerCase().includes(query) ||
          artisan.username.toLowerCase().includes(query) ||
          artisan.city?.toLowerCase().includes(query) ||
          artisan.country?.toLowerCase().includes(query)
        );
      }
    });
  }





  deleteArtisan(artisan: Artisan): void {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (!confirmed) return;
    this.artisanService.deleteArtisan(artisan.id).subscribe({
      next: () => {
        this.artisans = this.artisans.filter(a => a.id !== artisan.id);
        this.filteredArtisans = this.filteredArtisans.filter(a => a.id !== artisan.id);
        this.newArtisans = this.newArtisans.filter(a => a.id !== artisan.id);
      },
      error: (error) => {
        console.error('Failed to delete artisan:', error);
      }
    });
  }
}

