import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../models/message'; // تأكد من أن المسار صحيح
import { RecentMessage } from '../models/RecentMessage';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
  const token = localStorage.getItem('token');
  let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  return headers;
}

getRecentMessages(): Observable<RecentMessage[]> {
  return this.http.get<RecentMessage[]>(`${this.apiUrl}/messages/recent`, {
    headers: this.getHeaders()
  });
}


  getChatMessagesById(receiverId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/messages/${receiverId}`, {
      headers: this.getHeaders()
    });
  }

  sendMessage(receiverId: number, content: string): Observable<Message> {
    const body = { receiver_id: receiverId, content };
    return this.http.post<Message>(`${this.apiUrl}/messages`, body, {
      headers: this.getHeaders()
    });
  }

  getRandomReply(): string {
    const replies = [
      'Thanks for reaching out!',
      'I’ll get back to you soon.',
      'Can you clarify that?',
      '👍'
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  }
}
