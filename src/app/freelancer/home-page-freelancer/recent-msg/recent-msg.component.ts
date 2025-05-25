import { Component } from '@angular/core';
import { ChatService } from '../../../../services/ChatService.service';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-recent-msg',
  imports: [
    NgIf,
    RouterLink,
    NgForOf
  ],
  templateUrl: './recent-msg.component.html',
  styleUrl: './recent-msg.component.css'
})
export class RecentMsgComponent {
  recentMessages: any[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.getRecentMessages().subscribe((msgs) => {
      this.recentMessages = msgs.slice(0, 3); // only show top 3
    });
  }
}
