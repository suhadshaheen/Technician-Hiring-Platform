import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RecentMessage } from '../models/RecentMessage';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor() {}

  getRecentMessages(): Observable<RecentMessage[]> {
    const messages: RecentMessage[] = [
      {
        id: '1',
        name: 'suhad',
        text: 'I remember that project due is tomorrow',
        avatar: 'https://i.pinimg.com/736x/2c/6f/8a/2c6f8a82fd3af999e3b3a16b60425ade.jpg',
        time: '2m ago'
      },
      {
        id: '2',
        name: 'Eman',
        text: 'Hey, dont forget to clear server cache!',
        avatar: 'https://i.pinimg.com/736x/13/73/1f/13731f7c3658492aa0df672be7121faf.jpg',
        time: '5m ago'
      },
      {
        id: '3',
        name: 'yazan',
        text: 'I dont know where that file saved tho',
        avatar: 'https://i.pinimg.com/736x/6c/30/27/6c3027410695066649989ff9a7a02fc9.jpg',
        time: '10m ago'
      }
    ];
    return of(messages);
  }

  getChatMessagesById(chatId: number): Observable<any[]> {
    const mockChats: Record<number, { from: string; text: string; avatar?: string; time: string }[]> = {
      1: [
        { from: 'owner', text: 'hello', avatar: 'https://i.pinimg.com/736x/2c/6f/8a/2c6f8a82fd3af999e3b3a16b60425ade.jpg', time: new Date().toLocaleTimeString() },
        { from: 'me', text: 'Hi! I saw your job post.', time: new Date().toLocaleTimeString() }
      ],
      2: [
        { from: 'owner', text: 'Hello!', avatar: 'https://i.pinimg.com/736x/13/73/1f/13731f7c3658492aa0df672be7121faf.jpg', time: new Date().toLocaleTimeString() },
        { from: 'me', text: 'Yes, what do you need?', time: new Date().toLocaleTimeString() }
      ],
      3: [
        { from: 'owner', text: 'Hi, are you free tomorrow?', avatar: 'https://i.pinimg.com/736x/6c/30/27/6c3027410695066649989ff9a7a02fc9.jpg', time: new Date().toLocaleTimeString() },
        { from: 'me', text: 'Let me check my schedule', time: new Date().toLocaleTimeString() }
      ]
    };

    return of(mockChats[chatId] || []);
  }
  getRandomReply(): string {
    const replies = [
      'Thanks for the update!',
      'Can you send your portfolio?',
      'I\'ll get back to you shortly',
      'Perfect, let’s discuss the next steps',
      'Great! When can you start?'
    ];
    const randomIndex = Math.floor(Math.random() * replies.length);
    return replies[randomIndex];
  }

}
