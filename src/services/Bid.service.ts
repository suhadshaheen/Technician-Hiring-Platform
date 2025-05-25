import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BidService {
  private API_URL = 'http://127.0.0.1:8000/api/bids';

  constructor(private http: HttpClient) {}
//بتجيب التوكين المخزن باللوكال ستوريج عشان لارفيل يعرف مين المستخدم بحيث يعرض بس بيانته مش بيانات غيره
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  submitBid(bidData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(this.API_URL, bidData, { headers });
  }

 getMyBids(): Observable<any> {
  const headers = this.getAuthHeaders();
  return this.http.get(this.API_URL, { headers });
}


  deleteBid(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.API_URL}/${id}`, { headers });
  }
}
