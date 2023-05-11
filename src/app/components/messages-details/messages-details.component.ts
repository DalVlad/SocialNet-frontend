import { Component, Input} from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Messages } from 'src/app/models/messages.model';
import { UserService } from 'src/app/services/user.service';
import { Users } from 'src/app/models/users.model';

@Component({
  selector: 'app-messages-details',
  templateUrl: './messages-details.component.html',
  styleUrls: ['./messages-details.component.css']
})

export class MessagesDetailsComponent {

  @Input() currentMessage: Messages = {
    message: '',
    username: ''
  };

  message = '';

  constructor(
    private messagesService: MessagesService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getMessage(this.route.snapshot.params["idChat"], this.route.snapshot.params["idMess"]);
  }

  getMessage(idChat: string, idMess: string): void {
    this.messagesService.get(idChat, idMess)
      .subscribe({
        next: (data) => {
          this.currentMessage = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateMessage(): void {

    this.messagesService.update(this.route.snapshot.params["idChat"], this.currentMessage.id, this.currentMessage)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
    this.currentMessage.editMess = false;
  }

  deleteMessage(): void {
    let idChat = this.route.snapshot.params["idChat"];
    this.messagesService.delete(idChat, this.currentMessage.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate([`/chats/${idChat}/messages`]);
        },
        error: (e) => console.error(e)
      });
  }

  closeEdit() {
    this.currentMessage.editMess = false;
  }
}
