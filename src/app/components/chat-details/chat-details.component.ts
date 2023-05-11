import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chat } from 'src/app/models/chat.model';
import { Users } from 'src/app/models/users.model';
import { ChatService } from 'src/app/services/chat.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.component.html',
  styleUrls: ['./chat-details.component.css']
})
export class ChatDetailsComponent {
  currentChat: Chat = {
    nameChat: ''
  };

  currentUser: any;
  usersInChat: Users[] = [];
  usersOutChat: Users[] = [];
  selectedUser: string[] = [];

  constructor(
    private chatService: ChatService,
    private userService: UserService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.selectedUser = []
    this.currentUser = this.storageService.getUser();
    this.getChat(this.route.snapshot.params["idChat"]);
    this.getUsers(this.route.snapshot.params["idChat"]);
  }

  getChat(idChat: any): void {
    this.chatService.getChat(idChat)
      .subscribe({
        next: (data) => {
          this.currentChat = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  getUsers(idChat: any): void {
    this.userService.getUsersByChatId(idChat)
      .subscribe({
        next: (data) => {
          this.usersInChat = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });

    this.userService.getUsersOutByChatId(idChat)
      .subscribe({
        next: (data) => {
          this.usersOutChat = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateChat(): void {
    let idChat = this.route.snapshot.params["idChat"];

    this.selectedUser = this.usersInChat.map(u => u.username!);

    const data = {
      nameChat: this.currentChat.nameChat,
      users: this.selectedUser
    }

    this.chatService.update(idChat, data)
      .subscribe({
        next: (res) => {
          console.log(res)
        },
        error: (e) => console.error(e)
      });

    this.router.navigate([`/chats/${idChat}/messages`]);
  }

  addUser(user: Users): void {
    this.usersInChat.push(user);

    this.usersOutChat.forEach( (item, index) => {
      if(item === user) this.usersOutChat.splice(index, 1);
    });

  }

  removeUser(user: Users): void {
    this.usersInChat.forEach( (item, index) => {
      if(item === user) this.usersInChat.splice(index, 1);
    });

    this.usersOutChat.push(user);
  }

  leaveChat() {
    this.usersInChat.forEach( (item, index) => {
      if(item.id === this.currentUser.id) this.usersInChat.splice(index, 1);
    });

    this.updateChat();
    this.router.navigate([`/chats`]);

  }

  returnOnMessList() {
    let idChat = this.route.snapshot.params["idChat"];
    this.router.navigate([`/chats/${idChat}/messages`]);
  }
}
