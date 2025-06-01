import { Component, AfterViewInit, OnInit } from '@angular/core';
import { NgForOf, NgClass, NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';

import {
  Chart,
  registerables,
  PolarAreaController,
  RadialLinearScale,
  ArcElement,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
} from 'chart.js';
import { RouterModule, RouterLink } from '@angular/router';
import { AdminArtisanService, Artisan } from '../../../../services/adminArtisan.service';
import { JobsService } from '../../../../services/adminJob.service';

Chart.register(
  ...registerables,
  PolarAreaController,
  RadialLinearScale,
  ArcElement,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [NgForOf, NgClass, RouterModule, RouterLink, NgIf, CommonModule],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit, AfterViewInit {

  artisans: any[] = [];
  polarChart: any;
  linearChart: any;
  jobs: any[] = [];
  filteredJobs: any[] = [];
  newJobs: any[] = [];
  filteredArtisans: Artisan[] = [];
  newArtisans: Artisan[] = [];

  constructor(private artisanService: AdminArtisanService,
    private jobsService: JobsService) { }

  ngOnInit(): void {
  this.jobsService.getJobs().subscribe(data => {
  this.jobs = data;

  this.jobs.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
    this.newJobs = this.jobs.slice(0, 5);

  this.filteredJobs = [...this.jobs];
});

    
this.artisanService.getArtisans().subscribe({
  next: (artisans) => {
    this.artisans = artisans;

    this.artisans.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    this.newArtisans = this.artisans.slice(0, 7);

    this.filteredArtisans = [...this.artisans];
  }
});



  }

 ngAfterViewInit() {
    this.loadDataAndCharts();
  }

  loadDataAndCharts() {
    this.jobsService.getJobs().subscribe(jobsData => {
      this.jobs = jobsData;
      this.artisanService.getArtisans().subscribe(artisansData => {
        this.artisans = artisansData;
        this.loadCharts(); 
      });
    });
  }

  loadCharts() {
    const ctxPolar = (document.getElementById('polarChart') as HTMLCanvasElement)?.getContext('2d');
    const ctxLinear = (document.getElementById('linearChart') as HTMLCanvasElement)?.getContext('2d');

    if (ctxPolar) {
      this.polarChart = new Chart(ctxPolar, {
        type: 'polarArea',
        data: {
          labels: ['Pending', 'In Progress', 'Completed'],
          datasets: [{
            data: [
              this.jobs.filter(j => j.status === 'pending').length,
              this.jobs.filter(j => j.status === 'in progress').length,
              this.jobs.filter(j => j.status === 'completed').length
            ],
            backgroundColor: ['#ffc107', '#198754', '#dc3545'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'right' }
          }
        }
      });
    }

    if (ctxLinear) {
      this.linearChart = new Chart(ctxLinear, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          datasets: [
            {
              label: 'Jobs Posted',
              data: [30, 45, 50, 60, 70, 75, 80], // <-- يمكنك تغيير هذه القيم لاحقًا ببيانات حقيقية
              borderColor: '#36a2eb',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              tension: 0.3,
              fill: true
            },
            {
              label: 'New Artisans',
              data: [15, 20, 25, 30, 35, 40, 42], // <-- وها هنا أيضًا
              borderColor: '#9966ff',
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              tension: 0.3,
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    }
  }

  refreshCharts() {
    if (this.polarChart) {
      this.polarChart.data.datasets[0].data = [
        this.jobs.filter(j => j.status === 'pending').length,
        this.jobs.filter(j => j.status === 'in progress').length,
        this.jobs.filter(j => j.status === 'completed').length
      ];
      this.polarChart.update();
    }
  }
}