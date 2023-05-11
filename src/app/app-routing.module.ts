import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMessagesComponent } from './components/add-messages/add-messages.component';
import { MessagesDetailsComponent } from './components/messages-details/messages-details.component';
import { MessagesListComponent } from './components/messages-list/messages-list.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChatsListComponent } from './components/chats-list/chats-list.component';
import { AddChatComponent } from './components/add-chat/add-chat.component';
import { ChatDetailsComponent } from './components/chat-details/chat-details.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'chats', component: ChatsListComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'chats/:idChat/messages', component: MessagesListComponent },
  { path: 'chats/:idChat/messages/:idMess', component: MessagesDetailsComponent },
  { path: 'chats/addChat', component: AddChatComponent },
  { path: 'chats/:idChat', component: ChatDetailsComponent },
  { path: 'add', component: AddMessagesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
