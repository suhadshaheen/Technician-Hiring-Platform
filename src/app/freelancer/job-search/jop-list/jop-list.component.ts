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

  showFilters = false;

  selectedCategory = '';
  selectedLocation = '';
  selectedBudget = '';
  searchText = '';

  currentPage = 1;
  jobsPerPage = 9;

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
        this.currentPage = 1; //عشان كل مرة بحمل يرجع لاول صفحة
      },
      error: (err) => {
        console.error('Failed to load jobs:', err);
      }
    });
  }

  toggleFilterDropdown() {
    this.showFilters = !this.showFilters;
  }

  goToDetails(id: number) {
    this.router.navigate(['/job-details', id]);
  }

  get categories(): string[] {
  return Array.from(new Set(this.jobs
    .filter(job => job.category)
    .map(job => job.category)));
}

get locations(): string[] {
  return Array.from(new Set(this.jobs
    .filter(job => job.location)
    .map(job => job.location)));
}


get budgets(): string[] {
  return Array.from(new Set(this.jobs
    .filter(job => job.budget !== null && job.budget !== undefined)
    .map(job => job.budget.toString())));
}


  // فلترة السيرش
  get filteredJobs() {
    return this.jobs; //بترجع الجوبس اللي من السيرفر
  }

  get totalPages(): number {
    return Math.ceil(this.filteredJobs.length / this.jobsPerPage);
  }

  get paginatedJobs() {
    const startIndex = (this.currentPage - 1) * this.jobsPerPage;
    return this.filteredJobs.slice(startIndex, startIndex + this.jobsPerPage);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  get paginationPages() {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  // لما الفلترة تتغير بستدعي هاد الميثود
  // عشان تحمل الجوبس من السيرفر حسب الفلتر
  onFilterChange() {
    this.loadJobs();
  }
}
