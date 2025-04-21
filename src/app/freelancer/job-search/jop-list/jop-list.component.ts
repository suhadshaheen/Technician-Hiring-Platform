import {Component, Input} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf, CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { JobCardComponent } from './job-card/job-card.component';
import { JobService } from '../../services/Jobservice.service';

@Component({
  selector: 'app-jop-list',
  standalone: true,
  imports: [NgForOf, NgIf, CommonModule, RouterModule, FormsModule, JobCardComponent],
  templateUrl: './jop-list.component.html',
  styleUrls: ['./jop-list.component.css']
})
export class JopListComponent {
  @Input() jobs: any[] = [];
  @Input() showSearchBar: boolean = true;


  constructor(private jobService: JobService, private router: Router) {}

  ngOnInit(): void {
    this.jobs = this.jobService.getAllJobs();
  }

  goToDetails(id: number) {
    this.router.navigate(['/job-details', id]);
  }

  showFilters = false;

  toggleFilterDropdown() {
    this.showFilters = !this.showFilters;
  }

  selectedCategory: string = '';
  selectedLocation: string = '';
  selectedBudget: string = '';
  searchText: string = '';

  currentPage: number = 1;
  jobsPerPage: number = 9;

  get categories(): string[] {
    return Array.from(new Set(this.jobs.map(job => job.category)));
  }

  get locations(): string[] {
    return Array.from(new Set(this.jobs.map(job => job.location)));
  }

  get budgets(): string[] {
    return Array.from(new Set(this.jobs.map(job => job.salary)));
  }

  get filteredJobs() {
    const text = this.searchText.toLowerCase().replace(/,/g, '').trim();

    return this.jobs.filter(job => {
      const jobTitle = job.title.toLowerCase();
      const jobDesc = job.description.toLowerCase();
      const jobSalary = job.salary.toLowerCase().replace(/,/g, '');
      const jobLocation = job.location.toLowerCase();

      return (
        (!this.selectedCategory || job.category === this.selectedCategory) &&
        (!this.selectedLocation || job.location === this.selectedLocation) &&
        (!this.selectedBudget || job.salary === this.selectedBudget) &&
        (
          jobTitle.includes(text) ||
          jobDesc.includes(text) ||
          jobSalary.includes(text) ||
          jobLocation.includes(text)
        )
      );
    });
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
}
