import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publication } from '../publication/publication';
import { CommentOnPublication } from './commentOnPublication';

@Injectable({
  providedIn: 'root'
})
export class CommentOnPublicationService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getComments(publicationId: number): Observable<CommentOnPublication[]> {
    return this.http.get<CommentOnPublication[]>(`${this.apiServerUrl}/publications/${publicationId}/comment`)
  }

  public createComment(publicationID: number, commentOnPublication: CommentOnPublication): void {
    this.http.post<CommentOnPublication>(`${this.apiServerUrl}/publications/${publicationID}/createComment`, commentOnPublication).subscribe()
  }


  public deleteComment(commentId: number): void {
    this.http.delete<void>(`${this.apiServerUrl}/publications/deleteComment/${commentId}`).subscribe()
  }
}
