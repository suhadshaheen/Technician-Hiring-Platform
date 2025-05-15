import { Component, AfterViewInit } from '@angular/core';
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
  imports: [NgForOf, NgClass, RouterModule, RouterLink, NgIf,CommonModule],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements AfterViewInit {
  
  cards = [
    { number: '1,250', name: 'Job Requests', icon: 'bi-briefcase-fill', color: 'primary' },
    { number: '980', name: 'Approved Artisans', icon: 'bi-person-check-fill', color: 'success' },
    { number: '$12,340', name: 'Platform Earnings', icon: 'bi-currency-dollar', color: 'warning' },
    { number: '3,200', name: 'Site Visits', icon: 'bi-graph-up-arrow', color: 'info' }
  ];

  artisans = [
    { id: 1, name: 'Ahmed Khaled', skill: 'Electrician', location: 'Cairo', status: 'approved' },
    { id: 2, name: 'Fatima Nour', skill: 'Plumber', location: 'Amman', status: 'pending' },
    { id: 3, name: 'Mohammed Zain', skill: 'Painter', location: 'Riyadh', status: 'rejected' },
    { id: 4, name: 'Layla Hassan', skill: 'Carpenter', location: 'Beirut', status: 'approved' },
    { id: 5, name: 'Omar Fathi', skill: 'AC Technician', location: 'Dubai', status: 'pending' }
  ];

 recentJobs = [
  { title: 'Electrician Needed', location: 'Cairo', postedDate: new Date('2025-05-10') },
  { title: 'Plumbing Repair', location: 'Amman', postedDate: new Date('2025-05-12') },
  { title: 'House Painter', location: 'Riyadh', postedDate: new Date('2025-05-13') },
  { title: 'AC Installation', location: 'Dubai', postedDate: new Date('2025-05-14') },
  { title: 'Carpenter Needed', location: 'Beirut', postedDate: new Date('2025-05-15') }
];

  polarChart: any;
  linearChart: any;

  constructor() {}

  ngAfterViewInit() {
    this.loadCharts();
  }

  loadCharts() {
    const ctxPolar = (document.getElementById('polarChart') as HTMLCanvasElement).getContext('2d');
    const ctxLinear = (document.getElementById('linearChart') as HTMLCanvasElement).getContext('2d');

    if (ctxPolar) {
      this.polarChart = new Chart(ctxPolar, {
        type: 'polarArea',
        data: {
          labels: ['Pending', 'Approved', 'Rejected'],
          datasets: [{
            data: [
              this.artisans.filter(a => a.status === 'pending').length,
              this.artisans.filter(a => a.status === 'approved').length,
              this.artisans.filter(a => a.status === 'rejected').length
            ],
            backgroundColor: [
              'rgba(255, 206, 86, 0.6)', // warning yellow
              'rgba(75, 192, 192, 0.6)', // success green
              'rgba(255, 99, 132, 0.6)'  // danger red
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'right' },
            tooltip: { enabled: true }
          }
        }
      });
    }

    if (ctxLinear) {
      this.linearChart = new Chart(ctxLinear, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'Jobs Posted',
              data: [30, 45, 50, 60, 70, 75, 80],
              borderColor: 'rgba(54, 162, 235, 0.7)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              fill: true,
              tension: 0.3
            },
            {
              label: 'New Artisans',
              data: [15, 20, 25, 30, 35, 40, 42],
              borderColor: 'rgba(153, 102, 255, 0.7)',
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              fill: true,
              tension: 0.3
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  // updateStatus(artisan: any, newStatus: string) {
  //   const confirmMsg = Are you sure you want to ${newStatus} artisan "${artisan.name}"?;
  //   if (confirm(confirmMsg)) {
  //     artisan.status = newStatus;
  //     alert(Artisan "${artisan.name}" status updated to "${newStatus}".);
  //     this.refreshCharts();
  //   }
  // }

  refreshCharts() {
    if (this.polarChart) {
      this.polarChart.data.datasets[0].data = [
        this.artisans.filter(a => a.status === 'pending').length,
        this.artisans.filter(a => a.status === 'approved').length,
        this.artisans.filter(a => a.status === 'rejected').length
      ];
      this.polarChart.update();
    }
  }

}