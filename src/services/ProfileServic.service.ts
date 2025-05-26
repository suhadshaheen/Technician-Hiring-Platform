import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../models/Profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });
  }

  updateProfilePhoto(userId: number, photoFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('user_id', userId.toString());
    formData.append('photo', photoFile, photoFile.name);

    return this.http.post(`${this.apiUrl}/profile/photo`, formData, {
      headers: this.getAuthHeaders()
    });
  }

  updateProfileBio(userId: number, bio: string): Observable<any> {
    const body = { user_id: userId, bio: bio };
    return this.http.post(`${this.apiUrl}/profile/bio`, body, {
      headers: this.getAuthHeaders()
    });
  }

  updateProfileSkills(userId: number, skills: string): Observable<any> {
  const body = { user_id: userId, skills: skills };
  return this.http.post(`${this.apiUrl}/profile/skills`, body, {
    headers: this.getAuthHeaders()
  });
}


  updateProfileSocialLinks(userId: number, whatsappNumber: string, instagramLink: string, facebookLink: string): Observable<any> {
    const body = {
      user_id: userId,
      whatsappNumber: whatsappNumber,
      InstagramLink: instagramLink,
      FacebookLink: facebookLink
    };
    return this.http.post(`${this.apiUrl}/profile/social-links`, body, {
      headers: this.getAuthHeaders()
    });
  }
}
