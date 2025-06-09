import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ReviewData {
  bidId: number;
  freelancerId: number;
  rating: number;
  comment: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://127.0.0.1:8000/api/reviews';

  constructor(private http: HttpClient) {}

  submitReview(reviewData: ReviewData, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(this.apiUrl, reviewData, { headers });
  }
  TopRated(): Observable<any[]> {
    return this.http.get<any[]>('http://127.0.0.1:8000/api/top-artisans');
  }

}
