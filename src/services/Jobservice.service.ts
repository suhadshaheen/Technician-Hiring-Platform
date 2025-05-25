import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Job {
  id: number;
  title: string;
  description: string;
  status: string;
  location: string;
  category: string;
  job_requirements?: string;
  deadline?: string;
  posting_date?: string;
  job_owner_id: number;
  JobPhoto?: string;
  budget: number;
  attempts?: number;
  available_at?: string;
}


@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  token = localStorage.getItem('token'); // أو this.authService.getToken()


  constructor(private http: HttpClient) {}

  getAllJobs(filters?: any): Observable<Job[]> {
    let params = new HttpParams();

    if (filters) {
      if (filters.category) params = params.set('category', filters.category);
      if (filters.location) params = params.set('location', filters.location);
      if (filters.budget) params = params.set('budget', filters.budget);
      if (filters.search) params = params.set('search', filters.search);
    }

   return this.http.get<Job[]>(`${this.apiUrl}/jobs`, { params });

  }

getJobById(id: number): Observable<Job> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.get<Job>(`${this.apiUrl}/jobs/${id}`, { headers });
}


 updateJobStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/status`, { status });
  }

}
