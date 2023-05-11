import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chat } from '../models/chat.model';

const baseUrl = 'http://localhost:8080/api/chats';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Chat[]> {
    return this.http.get<Chat[]>(baseUrl);
  }

  getChat(id: any): Observable<Chat> {
    return this.http.get<Chat>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  createMessage(id: any, data: any): Observable<any> {
    return this.http.post(`${baseUrl}/${id}/message` , data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  findByNameChat(nameChat: any): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${baseUrl}?nameChat=${nameChat}`)
  }

}
