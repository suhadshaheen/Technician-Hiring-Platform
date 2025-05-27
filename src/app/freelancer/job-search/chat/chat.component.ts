import { Component, OnInit, HostListener } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../../../services/ChatService.service';
import { Message, MessageWithMeta } from '../../../../models/message';
import { User } from '../../../../models/User';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgClass, FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  newMessage = '';
  isTyping = false;
  messages: MessageWithMeta[] = [];
  recentContacts: User[] = [];
  currentChatId: number | null = null;

  currentOwnerAvatar: string = '';
  currentOwnerName: string = '';
  currentReceiverId: number = 0;

  currentUserId: number = Number(localStorage.getItem('userId') || '0');

  sidebarOpen: boolean = true;
  isMobile = false;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.getRecentContacts().subscribe((data) => {
      this.recentContacts = data;
      if (data.length > 0) {
        this.openChat(data[0].id);
      } else {
        console.log('No recent contacts found for user:', this.currentUserId);

        this.currentReceiverId = 23;
        this.currentOwnerName = 'suhad';
        this.currentOwnerAvatar = 'assets/default.png';

        this.chatService.getChatMessagesById(2).subscribe((msgs) => {
          this.messages = msgs.map(msg => ({
            ...msg,
            from: msg.sender_id === this.currentUserId ? 'me' : 'owner',
            avatar: msg.sender_id !== this.currentUserId ? this.currentOwnerAvatar : ''
          })) as MessageWithMeta[];
        });
      }
    });

    this.checkScreenSize();
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

    const owner = this.recentContacts.find(user => user.id === id);
    this.currentOwnerAvatar = owner?.profile?.User_photo|| 'assets/default-avatar.png';
    this.currentOwnerName = owner?.firstname || 'Unknown';

    this.chatService.getChatMessagesById(id).subscribe((msgs: Message[]) => {
      this.messages = msgs.map(msg => ({
        ...msg,
        from: msg.sender_id === this.currentUserId ? 'me' : 'owner',
        avatar: msg.sender_id !== this.currentUserId ? this.currentOwnerAvatar : ''
      })) as MessageWithMeta[];
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
          const msg: MessageWithMeta = {
            ...sentMessage,
            from: 'me',
            avatar: ''
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
