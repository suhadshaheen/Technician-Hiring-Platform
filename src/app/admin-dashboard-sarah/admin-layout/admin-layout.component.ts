import { Component } from '@angular/core';
import { NgForOf, NgClass, NgIf } from '@angular/common';

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
import { RouterModule } from '@angular/router';


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
  imports: [NgForOf, NgClass,RouterModule,NgIf],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {
  cards = [
    { number: '1,250', name: 'Job Requests', icon: 'bi-briefcase-fill', color: 'primary' },
    { number: '980', name: 'Approved Artisans', icon: 'bi-person-check-fill', color: 'success' },
    { number: '$12,340', name: 'Platform Earnings', icon: 'bi-currency-dollar', color: 'warning' },
    { number: '3,200', name: 'Site Visits', icon: 'bi-graph-up-arrow', color: 'info' }
  ];

  artisans = [
    { name: 'Ahmed Khaled', skill: 'Electrician', location: 'Cairo', status: 'approved' },
    { name: 'Fatima Nour', skill: 'Plumber', location: 'Amman', status: 'pending' },
    { name: 'Mohammed Zain', skill: 'Painter', location: 'Riyadh', status: 'rejected' },
    { name: 'Layla Hassan', skill: 'Carpenter', location: 'Beirut', status: 'approved' },
    { name: 'Omar Fathi', skill: 'AC Technician', location: 'Dubai', status: 'pending' }
  ];

  companies = [
    { name: 'FixIt Co.', country: 'UAE', jobsPosted: 14 },
    { name: 'CraftMasters', country: 'Jordan', jobsPosted: 11 },
    { name: 'HomeCare Ltd.', country: 'Saudi Arabia', jobsPosted: 9 },
    { name: 'BuildPro', country: 'Egypt', jobsPosted: 7 },
    { name: 'Vision Renovators', country: 'Kuwait', jobsPosted: 5 }
  ];

  ngAfterViewInit(): void {
    // Count artisan status dynamically
    const approved = this.artisans.filter(a => a.status === 'approved').length;
    const pending = this.artisans.filter(a => a.status === 'pending').length;
    const rejected = this.artisans.filter(a => a.status === 'rejected').length;

    // Polar Chart
    new Chart('polarChart', {
      type: 'polarArea',
      data: {
        labels: ['Approved', 'Pending', 'Rejected'],
        datasets: [{
          label: 'Artisan Status',
          data: [approved, pending, rejected],
          backgroundColor: ['rgb(0, 123, 255)', 'rgb(255, 193, 7)', 'rgb(220, 53, 69)']
        }]
      },
      options: {
        responsive: true
      }
    });

    // Line Chart
    new Chart('linearChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Job Postings',
            data: [12, 19, 3, 5, 2, 3],
            borderColor: 'rgba(9, 244, 56, 0.98)',
            backgroundColor: 'rgba(0, 239, 48, 0.3)',
            borderWidth: 3,
            fill: false,
            tension: 0.4
          },
          {
            label: 'Transactions',
            data: [10, 13, 5, 8, 6, 4],
            borderColor: 'rgb(89, 0, 255)',
            backgroundColor: 'rgba(89, 0, 255, 0.3)',
            borderWidth: 3,
            fill: false,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 5
            }
          }
        }
      }
    });
  }
}
