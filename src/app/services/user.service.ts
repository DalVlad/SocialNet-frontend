import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../models/users.model';

const API_URL = 'http://localhost:8080/api/users';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Users[]> {
    return this.http.get<Users[]>(API_URL);
  }

  getUsernameByMessId(idMess: any): Observable<Users> {
    return this.http.get<Users>(`${API_URL}/${idMess}`);
  }

  getUsersByChatId(idChat: any): Observable<Users[]> {
    return this.http.get<Users[]>(`${API_URL}/userInChat/${idChat}`);
  }

  getUsersOutByChatId(idChat: any): Observable<Users[]> {
    return this.http.get<Users[]>(`${API_URL}/userOutChat/${idChat}`);
  }

}
