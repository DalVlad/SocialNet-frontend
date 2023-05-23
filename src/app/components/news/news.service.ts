import { Observable } from 'rxjs';
import { News } from './news';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class NewsService {
    private newsUrl = 'http://localhost:8080/news';

    constructor(private http: HttpClient) {}

    public getNews(personId: number): Observable<News[]> {
        return this.http.get<News[]>(`${this.newsUrl}/${personId}`);
    }

    public createNews(personId: number, news: News): Observable<News> {
        return this.http.post<News>(`${this.newsUrl}?personId=${personId}`, news);
    }

    public updateNews(newsId: number, news: News): Observable<News> {
        return this.http.put<News>(`${this.newsUrl}/${newsId}`, news);
    }

    public deleteNews(newsId: number): Observable<void> {
        return this.http.delete<void>(`${this.newsUrl}/${newsId}`);
    }
}