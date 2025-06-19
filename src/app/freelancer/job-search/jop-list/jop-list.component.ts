import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf, CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { JobCardComponent } from './job-card/job-card.component';
import { JobService } from '../../../../services/Jobservice.service';

@Component({
  selector: 'app-jop-list',
  standalone: true,
  imports: [NgForOf, NgIf, CommonModule, RouterModule, FormsModule, JobCardComponent],
  templateUrl: './jop-list.component.html',
  styleUrls: ['./jop-list.component.css']
})
export class JopListComponent implements OnInit {
  @Input() jobs: any[] = [];
  @Input() showSearchBar: boolean = true;
  @Input() jobsPerPage: number = 9;

  showFilters = false;

  selectedCategory = '';
  selectedLocation = '';
  selectedBudget = '';
  searchText = '';

  currentPage = 1;


  constructor(private jobService: JobService, private router: Router) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs() {
    const filters: any = {};

    if (this.selectedCategory) filters.category = this.selectedCategory;
    if (this.selectedLocation) filters.location = this.selectedLocation;
    if (this.selectedBudget) filters.budget = this.selectedBudget;
    if (this.searchText) filters.search = this.searchText;

    this.jobService.getAllJobs(filters).subscribe({
      next: (jobs: any[]) => {
        this.jobs = jobs;
        this.currentPage = 1;
      },
      error: (err) => {
        console.error('Failed to load jobs:', err);
      }
    });
  }

  toggleFilterDropdown() {
    this.showFilters = !this.showFilters;
  }

  // goToDetails(id: number) {
  //   this.router.navigate(['/job-details', id]);
  // }

getCategories(): string[] {
  return Array.from(new Set(this.jobs
    .filter(job => job.category)
    .map(job => job.category)));
}

getLocations(): string[] {
  return Array.from(new Set(this.jobs
    .filter(job => job.location)
    .map(job => job.location)));
}


getBudgets(): string[] {
  return Array.from(new Set(this.jobs
    .filter(job => job.budget !== null && job.budget !== undefined)
    .map(job => job.budget.toString())));
}


  getTotalPages(): number {
    return Math.ceil(this.jobs.length / this.jobsPerPage);
  }

  getPaginatedJobs() {
    const startIndex = (this.currentPage - 1) * this.jobsPerPage;
    return this.jobs.slice(startIndex, startIndex + this.jobsPerPage);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  nextPage() {
    if (this.currentPage < this.getTotalPages()) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  get paginationPages() {
    return Array(this.getTotalPages()).fill(0).map((_, i) => i + 1);
  }

  onFilterChange() {
    this.loadJobs();
  }
}
