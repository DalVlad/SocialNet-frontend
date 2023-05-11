import { ChatService } from 'src/app/services/chat.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Messages } from 'src/app/models/messages.model';
import { MessagesService } from 'src/app/services/messages.service';
import { Chat } from 'src/app/models/chat.model';
import { MessagesListComponent } from '../messages-list/messages-list.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-messages',
  templateUrl: './add-messages.component.html',
  styleUrls: ['./add-messages.component.css']
})

export class AddMessagesComponent {
  message: Messages = {
    message: ''
  };

  @Input() currentChat: Chat = {}

  constructor(
    private messagesService: MessagesService,
    private chatService: ChatService,
    private route: ActivatedRoute,
    private router: Router,
    private messageComponent: MessagesListComponent) { }

  ngOnInit(): void {
  }

  saveMessage(): void {
    const data = {
      message: this.message.message
    };

    this.chatService.createMessage(this.route.snapshot.params["idChat"], data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.messageComponent.ngOnInit();
        },
        error: (e) => console.error(e)
      });

      this.message = {
        message: ''
      };
  }

  saveMetod = new Observable(this.saveMessage);
}
