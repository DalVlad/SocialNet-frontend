import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddMessagesComponent } from './components/add-messages/add-messages.component';
import { MessagesDetailsComponent } from './components/messages-details/messages-details.component';
import { MessagesListComponent } from './components/messages-list/messages-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';

import { httpInterceptorProviders } from './_helpers/auth.interceptor';
import { ChatsListComponent } from './components/chats-list/chats-list.component';
import { AddChatComponent } from './components/add-chat/add-chat.component';
import { ChatDetailsComponent } from './components/chat-details/chat-details.component';

@NgModule({
  declarations: [
    AppComponent,
    AddMessagesComponent,
    MessagesDetailsComponent,
    MessagesListComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    ChatsListComponent,
    AddChatComponent,
    ChatDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
