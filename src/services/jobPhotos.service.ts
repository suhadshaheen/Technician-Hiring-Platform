import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobPhotoService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  uploadPhotos(jobId: number, images: File[]): Observable<any> {
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append('images[]', image); 
    });
    formData.append('job_id', String(jobId));
    return this.http.post(`${this.apiUrl}/job-photos`, formData, {
      headers: this.getAuthHeaders()
    });
  }

  getPhotosByJobId(jobId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/job-photos/job/${jobId}`, {
      headers: this.getAuthHeaders()
    });
  }


  deletePhoto(photoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/job-photos/${photoId}`, {
      headers: this.getAuthHeaders()
    });
  }
}
