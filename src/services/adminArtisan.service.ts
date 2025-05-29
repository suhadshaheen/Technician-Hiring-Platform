import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface Artisan {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  username: string;
  created_at: string; 
}

@Injectable({
  providedIn: 'root'
})
export class AdminArtisanService {
  private apiUrl = 'http://127.0.0.1:8000/api/admin/artisans';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

getArtisans(): Observable<Artisan[]> {
  return this.http.get<{status: boolean, data: Artisan[]}>(this.apiUrl, {
    headers: this.getAuthHeaders()
  }).pipe(
    map(response => response.data)
  );
}

searchArtisans(query: string): Observable<Artisan[]> {
  const url = `${this.apiUrl}/search?query=${encodeURIComponent(query)}`;
  return this.http.get<{status: boolean, results: Artisan[]}>(url, {
    headers: this.getAuthHeaders()
  }).pipe(
    map(response => response.results)
  );
}



  deleteArtisan(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, {
      headers: this.getAuthHeaders()
    });
  }
}
