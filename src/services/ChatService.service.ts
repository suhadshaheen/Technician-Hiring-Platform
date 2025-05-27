import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../models/message';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }


  getRecentContacts(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/messages/Contact`, {
      headers: this.getAuthHeaders()
    });
  }


  getChatMessagesById(receiver_id: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/messages/conversation/${receiver_id}`, {
      headers: this.getAuthHeaders()
    });
  }


  sendMessage(receiverId: number, content: string): Observable<Message> {
    const body = { receiver_id: receiverId, content };
    return this.http.post<Message>(`${this.apiUrl}/messages`, body, {
      headers: this.getAuthHeaders()
    });
  }

}
