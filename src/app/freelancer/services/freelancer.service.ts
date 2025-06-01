import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FreelancerDataService {
  constructor(private http: HttpClient) {}
  
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
  getFreelancerRatings(freelancerId: number): Observable<{ averageRating: number, ratingCount: number }> {
    return this.http.get<{ averageRating: number, ratingCount: number }>(
      `http://127.0.0.1:8000/api/freelancer-ratings/${freelancerId}`
    );
  }
}
