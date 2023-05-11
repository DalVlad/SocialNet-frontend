import { ChatService } from 'src/app/services/chat.service';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Messages } from 'src/app/models/messages.model';
import { MessagesService } from 'src/app/services/messages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Chat } from 'src/app/models/chat.model';
import { Users } from 'src/app/models/users.model';
import { UserService } from 'src/app/services/user.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})

export class MessagesListComponent implements OnInit {
  @ViewChild('scroll', { read: ElementRef }) public scroll!: ElementRef<any>;

  @Input() chat: Chat = {
    nameChat: ''
  };

  search = false;

  currentUser: any;
  messages: Messages[] = [];
  users: Users[] = [];
  currentMessage: Messages = {};
  currentIndex = -1;
  message = '';


  constructor(
    private messagesService: MessagesService,
    private chatService: ChatService,
    private userService: UserService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngAfterViewChecked() {
    this.scrollBottom()
  }


  ngOnInit(): void {

    this.currentUser = this.storageService.getUser();
    this.getChat(this.route.snapshot.params["idChat"]);
    this.getUser(this.route.snapshot.params["idChat"]);
    this.getMessanges(this.route.snapshot.params["idChat"]);
    /*interval(200).subscribe(
      () => {
        this.getMessanges(this.route.snapshot.params["idChat"]);
      }
    )*/
  }

  getChat(idChat: string): void {
    this.chatService.getChat(idChat)
      .subscribe({
        next: (data) => {
          this.chat = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      })
  }

  getMessanges(idChat: string): void {
    this.messagesService.getAll(idChat)
      .subscribe({
        next: (data) => {
          this.messages = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  getUser(idChat: any): string {
    let username = '';
    this.userService.getUsersByChatId(idChat)
      .subscribe({
        next: (data) => {
          this.users = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
    return username;
  }

  searchMessage(): void {
    this.currentMessage = {};
    this.currentIndex = -1;

    this.messagesService.findByMessage(this.route.snapshot.params["idChat"], this.message)
      .subscribe({
        next: (data) => {
          this.messages = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateMess(message: Messages) {
    message.editMess = true;
  }

  updateMessage(message: Messages): void {
    this.messagesService.update(this.route.snapshot.params["idChat"], message.id, message)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
    message.editMess = false;

  }

  deleteMessage(idMess: any): void {
    let idChat = this.route.snapshot.params["idChat"];
    this.messagesService.delete(idChat, idMess)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.ngOnInit();
        },
        error: (e) => console.error(e)
      });
  }

  public scrollBottom() {
    this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
  }

  opensearchForm() {
    this.search = true;
  }

  closeSearchForm() {
    this.search = false;
  }

  redirectToChatDetails() {
    let idChat = this.route.snapshot.params["idChat"];
    this.router.navigate([`/chats/${idChat}`]);
  }
}
