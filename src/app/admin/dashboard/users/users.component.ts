import { NgClass, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { FreelancerProfileComponent} from '../../../freelancer/freelancer-profile/freelancer-profile.component';
import { AdminArtisanService, Artisan } from '../../../../services/adminArtisan.service';

@Component({
  selector: 'app-users',
  imports:[NgClass,NgForOf,RouterModule,FreelancerProfileComponent,RouterLink],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

 export class UsersComponent implements OnInit {
  searchTerm: string = '';
  artisans: Artisan[] = [];
  filteredArtisans: Artisan[] = [];

  constructor(private artisanService: AdminArtisanService) {}

ngOnInit(): void {
  this.artisanService.getArtisans().subscribe({
    next: (data) => {
      console.log('Artisans loaded:', data);
      this.artisans = data;
      this.filteredArtisans = data;
    },
    error: (err) => {
      console.error('Error loading artisans:', err);
    }
  });
}

  onSearch(event: any): void {
    const query = event.target.value.toLowerCase();
    this.filteredArtisans = this.artisans.filter(artisan =>
      artisan.name.toLowerCase().includes(query) ||
      artisan.skill.toLowerCase().includes(query) ||
      artisan.location.toLowerCase().includes(query)
    );
  }

  updateStatus(artisan: Artisan, newStatus: string): void {
    this.artisanService.updateStatus(artisan.id, newStatus).subscribe(() => {
      artisan.status = newStatus;
    });
  }
}




// import { Component, OnInit } from '@angular/core';
// import { AdminArtisanService, Artisan } from 'src/app/services/admin-artisan.service';

// @Component({
//   selector: 'app-users',
//   templateUrl: './users.component.html',
//   styleUrls: ['./users.component.css'],
//   standalone: true,
//   imports: [NgClass, NgForOf, RouterModule, RouterLink]
// })
// export class UsersComponent implements OnInit {
//   searchTerm: string = '';
//   artisans: Artisan[] = [];
//   filteredArtisans: Artisan[] = [];

//   constructor(private artisanService: AdminArtisanService) {}

//   ngOnInit(): void {
//     this.artisanService.getArtisans().subscribe((data) => {
//       this.artisans = data;
//       this.filteredArtisans = data;
//     });
//   }

//   onSearch(event: any): void {
//     const query = event.target.value.toLowerCase();
//     this.filteredArtisans = this.artisans.filter(artisan =>
//       artisan.name.toLowerCase().includes(query) ||
//       artisan.skill.toLowerCase().includes(query) ||
//       artisan.location.toLowerCase().includes(query)
//     );
//   }

//   updateStatus(artisan: Artisan, newStatus: string): void {
//     this.artisanService.updateStatus(artisan.id, newStatus).subscribe(() => {
//       artisan.status = newStatus;
//     });
//   }
// }
