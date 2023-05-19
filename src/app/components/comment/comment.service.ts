import { Comment } from './comment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class CommentService {
    private commentUrl = 'http://localhost:8080/comment';

    constructor(private http: HttpClient){}

    public getComments(personId: number): Observable<Comment[]>{
        return this.http.get<Comment[]>(`${this.commentUrl}/${personId}`);
    }

    public createComment(personId: number, comment: Comment, newsId: number): Observable<Comment>{
        return this.http.post<Comment>(`${this.commentUrl}/${newsId}`, comment);
    }

    public updateComment(commentId: number, comment: Comment): Observable<Comment>{
        return this.http.put<Comment>(`${this.commentUrl}/${commentId}`, comment);
    }

    public deleteComment(commentId: number): Observable<void>{
        return this.http.delete<void>(`${this.commentUrl}/${commentId}`);
    }
}