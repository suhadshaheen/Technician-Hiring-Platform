// src/app/job.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private jobs = [
    {
      id: 1,
      title: 'Fix Plumbing Issue',
      description: 'There is a leak in the kitchen and bathroom, need someone to fix it.',
      time: '2025-04-01',
      level: 'Intermediate',
      experience: '2+ years experience',
      deadline: '2025-04-20',
      salary: '$100',
      location: 'Ramallah, Palestine',
      category: 'Plumbing',
      points: ['Must bring own tools', 'Urgent repair', 'Reliable and tidy'],
      status: 'Pending',
      bids: [],
      image: 'https://i.postimg.cc/DzMZk6n0/plumbing.jpg'
    },
    {
      id: 2,
      title: 'Paint the Living Room',
      description: 'Need someone to paint the living room, paint is provided but need clean work.',
      time: '2025-04-05',
      level: 'Beginner',
      experience: 'No experience required',
      deadline: '2025-04-22',
      salary: '$150',
      location: 'Nablus, Palestine',
      category: 'Painting',
      points: ['Clean work', 'Fast completion', 'Attention to detail'],
      status: 'In Progress',
      bids: [],
      image: 'https://i.postimg.cc/G3ksgk1X/painting.jpg'
    },
    {
      id: 3,
      title: 'Electrical Maintenance',
      description: 'There is an issue with the wiring in the kitchen, need an experienced electrician.',
      time: '2025-04-10',
      level: 'Expert',
      experience: '3+ years experience',
      deadline: '2025-04-25',
      salary: '$200',
      location: 'Hebron, Palestine',
      category: 'Electrical',
      points: ['On time', 'Has own tools', 'Knowledge of modern electrical systems'],
      status: 'Pending',
      bids: [],
      image: 'https://i.postimg.cc/Y23yBdMf/electric.jpg'
    }
  ];

  getAllJobs() {
    return this.jobs;
  }

  getJobById(id: number) {
    return this.jobs.find(job => job.id === id);
  }
}
