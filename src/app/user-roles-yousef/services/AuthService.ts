import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API_URL = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {

    return this.http.post(`${this.API_URL}/login`, { username, password });
  }

  logout(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    localStorage.removeItem('token');
    return this.http.post(`${this.API_URL}/logout`, {}, { headers });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }



  getUserRoleId(): number {
    return Number(localStorage.getItem('roleId') || 0);
  }


  getUser(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`${this.API_URL}/me`, { headers });
  }
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.API_URL}/forgot-password`, { email });
  }
  resetPassword(data: {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
  }) {
    return this.http.post(`${this.API_URL}/reset-password`, data);
  }
  getUserRole(): string {
    const role = localStorage.getItem('role');
    return role ? role : 'guest';
  }

  getUserId(): number {
    return Number(localStorage.getItem('userId') || 0);
  }
  hasRole(allowedRoles: string[]): boolean {
    const userRole = this.getUserRole();
    return allowedRoles.includes(userRole);
  }


}
