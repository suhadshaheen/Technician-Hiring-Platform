import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FreelancerDataService {
  private freelancer = {
      fullName: 'Suhad Shaheen',
      role: 'freelancer',
      username: 'suhadsh.12',
      phone: '0595955264',
      email: 'suhadsh.12@gmail.com',
      city: 'Nablus',
      country: 'Palestine',
      about: 'Experienced electrician with 5+ years in home installations and systems.',
      skills: [
        { name: 'c++', percent: 80 },
        { name: 'Angular', percent: 70 },
        { name: 'Laravel', percent: 60 }
      ]
  };

  getFreelancer() {
    return this.freelancer;
  }

  updateFreelancer(updatedData: any) {
    this.freelancer = { ...this.freelancer, ...updatedData };
  }
}
