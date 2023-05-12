import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Community } from './community';
import { Publication } from '../publication/publication';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getAllCommunity(): Observable<Community[]> {
    return this.http.get<Community[]>(`${this.apiServerUrl}/community/all`)
  }

  public getCommunityByName(nameOfCommunity: string): Observable<Community> {
    return this.http.get<Community>(`${this.apiServerUrl}/community/${nameOfCommunity}`)
  }

  public createCommunity(community: Community): Observable<Community> {
    return this.http.post<Community>(`${this.apiServerUrl}/community/create`, community)
  }
  
  public updateCommunity(community: Community): Observable<Community> {
    return this.http.put<Community>(`${this.apiServerUrl}/community/update`, community)
  }

  public deleteCommunity(communityId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/community/delete/${communityId}`)
  }

}
