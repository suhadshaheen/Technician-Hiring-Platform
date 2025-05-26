import { Component, OnInit, HostListener } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecentMessage } from '../../../../models/RecentMessage';
import { ChatService } from '../../../../services/ChatService.service';
import { Message } from '../../../../models/message';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgClass, FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  newMessage = '';
  isTyping = false;
  messages: Message[] = [];
  recentMessages: RecentMessage[] = [];
  currentChatId: number | null = null;

  currentOwnerAvatar: string = '';
  currentOwnerName: string = '';
  currentReceiverId: number = 0;

 currentUserId: number = Number(localStorage.getItem('user_id') || '0');

  sidebarOpen: boolean = true;
  isMobile = false;

  constructor(private chatService: ChatService) {}

 ngOnInit(): void {
  this.chatService.getRecentMessages().subscribe((data) => {
    this.recentMessages = data;
    if (data.length > 0) {
      this.openChat(data[0].id);
    } else {
      console.log('No recent messages found for user:', this.currentUserId);


      this.currentReceiverId = 2;
      this.currentOwnerName = 'Test User';
      this.currentOwnerAvatar = 'assets/default-avatar.png';

      this.chatService.getChatMessagesById(2).subscribe((msgs) => {
        this.messages = msgs;
      });
    }
  });
}


  @HostListener('window:resize')
  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
    this.sidebarOpen = !this.isMobile;
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  openChat(receiverId: string | number) {
    const id = Number(receiverId);
    if (!id) {
      console.warn('Invalid receiverId:', receiverId);
      return;
    }

    this.currentReceiverId = id;
    this.currentChatId = id;

    const owner = this.recentMessages.find(msg => +msg.id === id);
    this.currentOwnerAvatar = owner?.User_Photo || '';
    this.currentOwnerName = owner?.firstname|| '';

    this.chatService.getChatMessagesById(id).subscribe((msgs) => {
      this.messages = msgs.map(msg => ({
        ...msg,
        from: msg.sender_id === this.currentUserId ? 'me' : 'owner',
        avatar: msg.sender_id !== this.currentUserId ? this.currentOwnerAvatar : ''
      }));
      setTimeout(() => this.scrollToBottom(), 100);
    });

    if (this.isMobile) this.sidebarOpen = false;
  }

  sendMessage() {
  if (!this.currentReceiverId) {
    alert('Please select a chat to send a message.');
    return;
  }

  if (this.newMessage.trim()) {
    this.chatService.sendMessage(this.currentReceiverId, this.newMessage).subscribe({
      next: (sentMessage: Message) => {
        const msg: Message = {
          ...sentMessage,
          from: 'me',
           User_photo: ''
        };
        this.messages.push(msg);
        this.newMessage = '';
        setTimeout(() => this.scrollToBottom(), 100);
      },
      error: err => {
        console.error('Error sending message:', err);
      }
    });
  }
}


  scrollToBottom() {
    const container = document.querySelector('.chat-messages');
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
  }
}
