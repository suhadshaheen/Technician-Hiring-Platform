import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Artisan {
  id: number;
  name: string;
  skill: string;
  location: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminArtisanService {
  private baseUrl = 'http://127.0.0.1:8000/api/admin/artisans'; 

  constructor(private http: HttpClient) {}

  getArtisans(): Observable<Artisan[]> {
    return this.http.get<Artisan[]>(this.baseUrl);
  }

  updateStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}/status`, { status });
  }

  deleteArtisan(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  searchArtisans(query: string): Observable<Artisan[]> {
    return this.http.get<Artisan[]>(`${this.baseUrl}/search`, {
      params: { query }
    });
  }
}
