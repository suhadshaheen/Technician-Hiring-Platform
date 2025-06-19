import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../models/Job';




@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

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

  postJob(jobData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/jobs`, jobData, {
      headers: this.getAuthHeaders()
    });
  }

getJobById(id: number): Observable<Job> {

  return this.http.get<Job>(`${this.apiUrl}/jobs/${id}`, { headers: this.getAuthHeaders() });
}

updateJob(id: number, jobData: any): Observable<any> {
  jobData.append('_method', 'PUT');
    return this.http.post(`${this.apiUrl}/jobs/${id}`, jobData, {
      headers: this.getAuthHeaders()
    });
  }

   getMyJobs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/my-jobs`, {
      headers: this.getAuthHeaders()
    });
  }

  deleteJob(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/jobs/${id}`, {
      headers: this.getAuthHeaders()
    });
  }


  getJobBids(jobId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/jobs/${jobId}/bids`, {
      headers: this.getAuthHeaders()
    });
  }

 updateJobStatus(id: number, status: string): Observable<any> {
  return this.http.put(`${this.apiUrl}/jobs/${id}/status`, { status }, {
    headers: this.getAuthHeaders()
  });
}


}
