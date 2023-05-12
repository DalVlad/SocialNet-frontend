import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from './member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private apiServerUrl = 'http://localhost:8080';


  constructor(private http: HttpClient) { }

  public getAllMembers(id: number): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.apiServerUrl}/member/${id}`)
  }
}
