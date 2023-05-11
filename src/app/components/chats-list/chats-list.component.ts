import { Component } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Chat } from 'src/app/models/chat.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.css']
})
export class ChatsListComponent {

  chats?: Chat[];
  currentChat: Chat = {};
  currentIndex = -1;
  nameChat = '';

  constructor(
    private chatService: ChatService,
    private router: Router) { }

  ngOnInit(): void {
    this.retrieveChats();
  }

  retrieveChats(): void {
    this.chatService.getAll()
      .subscribe({
        next: (data) => {
          this.chats = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveChats();
    this.currentChat = {};
    this.currentIndex = -1;
  }

  openMessagesChat(idChat: any): void {
    this.router.navigate([`chats/${idChat}/messages`]);
  }

  setActiveChats(chat: Chat, index: number): void {
    this.currentChat = chat;
    this.currentIndex = index;
  }

  searchChat(): void {
    this.currentChat = {};
    this.currentIndex = -1;

    this.chatService.findByNameChat(this.nameChat)
      .subscribe({
        next: (data) => {
          this.chats = data;
          console.log(data)
        },
        error: (e) => console.error(e)
      })
  }

  deleteChat(id: any): void {
    this.chatService.delete(id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.ngOnInit();
          //window.location.reload();
        },
        error: (e) => console.error(e)
      });

  }
}
