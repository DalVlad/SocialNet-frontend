import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { News } from './news';
import { NewsService } from './news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  public news: News[];

  constructor(private newsService: NewsService) { }
  ngOnInit(): void {
    this.getNews();
  }

  public getNews(): void {
    this.newsService.getNews(1).subscribe(
      (response: News[]) => {
        this.news = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public createNews(): void{
    
  }
}
