import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Publication } from './publication';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getAllPublication(communityName: String): Observable<Publication[]> {
    return this.http.get<Publication[]>(`${this.apiServerUrl}/community/${communityName}/publications`)
  }

  public deletePublication(publicationId: number): void {
    this.http.delete<void>(`${this.apiServerUrl}/community/deletePublication/${publicationId}`).subscribe()
  }
}
