import { Component } from '@angular/core';
import { Chat } from 'src/app/models/chat.model';
import { Users } from 'src/app/models/users.model';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-chat',
  templateUrl: './add-chat.component.html',
  styleUrls: ['./add-chat.component.css']
})
export class AddChatComponent {

  form: FormGroup;
  submitted = false;

  users?: Users[];
  selectedUser: string[] = [];

  chat: Chat = {
    nameChat: ""
  }

  constructor(
    private chatService: ChatService,
    private userSevice: UserService,
    fb: FormBuilder) {
      this.form = fb.group({
        pickedUsers:  new FormArray([])
       });
    }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.userSevice.getAll()
      .subscribe({
        next: (data) => {
          this.users = data;
          console.log(data);
        },
        error: (e) => console.log(e)
      })
  }

  saveChat(): void {
    const data = {
      nameChat: this.chat.nameChat,
      users: this.selectedUser
    };

    this.chatService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newChat(): void {
    this.chat = {
      nameChat: ''
    };
    this.users = [];
    this.submitted = false;
  }

  onCheckboxChange(event: any, userName: string) {

    const pickedUsers = (this.form.controls['pickedUsers'] as FormArray);
    if (event.target.checked) {
      pickedUsers.push(new FormControl(event.target.value));
      this.selectedUser.push(userName);
    } else {
      const index = pickedUsers.controls
      .findIndex(x => x.value === event.target.value);
      pickedUsers.removeAt(index);
      this.selectedUser.forEach( (item, index) => {
        if(item === userName) this.selectedUser.splice(index,1);
      });
    }
  }

  submit() {
    console.log(this.selectedUser);
  }
}
