import { Component, OnInit, HostListener } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecentMessage } from '../models/RecentMessage';
import { ChatService } from '../services/chat.service';

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
  messages: any[] = [];//كل الرسائل
  recentMessages: RecentMessage[] = [];//المحادثات
  currentChatId: number | null = null;//الشات الحالي

  currentOwnerAvatar: string = '';
  currentOwnerName: string = '';

  sidebarOpen: boolean = true;
  isMobile = false;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.getRecentMessages().subscribe((data) => {
      this.recentMessages = data;
      if (data.length > 0) {
        this.openChat(Number(data[0].id));
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

  openChat(id: string | number) {
    const chatId = Number(id);
    this.currentChatId = chatId;

    const owner = this.recentMessages.find(msg => +msg.id === chatId);
    this.currentOwnerAvatar = owner?.avatar || '';
    this.currentOwnerName = owner?.name || '';

    this.chatService.getChatMessagesById(chatId).subscribe(msgs => {
      this.messages = msgs;
      setTimeout(() => this.scrollToBottom(), 100);
    });

    if (this.isMobile) this.sidebarOpen = false;
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({
        from: 'me',
        text: this.newMessage,
        timestamp: new Date().toLocaleTimeString()
      });

      this.newMessage = '';
      setTimeout(() => this.scrollToBottom(), 100);
      this.simulateOwnerReply();
    }
  }

  simulateOwnerReply() {
    this.isTyping = true;

    setTimeout(() => {
      const replyText = this.chatService.getRandomReply();

      this.messages.push({
        from: 'owner',
        text: replyText,
        avatar: this.currentOwnerAvatar,
        timestamp: new Date().toLocaleTimeString()
      });

      this.isTyping = false;
      setTimeout(() => this.scrollToBottom(), 100);
    }, 1500);
  }

  scrollToBottom() {
    const container = document.querySelector('.chat-messages');
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
  }
}
