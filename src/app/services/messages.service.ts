import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Messages } from '../models/messages.model';

const baseUrl = 'http://localhost:8080/api/chats';

@Injectable({
  providedIn: 'root'
})

export class MessagesService {

  constructor(private http: HttpClient) { }

  getAll(idChat: any): Observable<Messages[]> {
    return this.http.get<Messages[]>(`${baseUrl}/${idChat}/messages`);
  }

  get(idChat: any, idMess: any): Observable<Messages> {
    return this.http.get(`${baseUrl}/${idChat}/messages/${idMess}`)
  }

  create(idChat: any, data: any): Observable<any> {
    return this.http.post(`${baseUrl}/${idChat}/message`, data);
  }

  update(idChat: any, idMess: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${idChat}/messages/${idMess}`, data);
  }

  delete(idChat: any, idMess: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${idChat}/messages/${idMess}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByMessage(idChat: any, messages: any): Observable<Messages[]> {
    return this.http.get<Messages[]>(`${baseUrl}/${idChat}/messages?messages=${messages}`);
  }

  likeMessage(idChat: any, idMess: any): Observable<any> {
    return this.http.put(`${baseUrl}/${idChat}/messages/likeMess/${idMess}`, null);
  }
}
