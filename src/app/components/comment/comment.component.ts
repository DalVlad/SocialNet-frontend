import { Component } from '@angular/core';
import { CommentService } from './comment.service';
import { Comment } from './comment';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  public comment: Comment[];
  public newsId: any;
  constructor(private commentService: CommentService, private route: ActivatedRoute) { 
    this.newsId = route.snapshot.params['newsId'];
  }
  ngOnInit(): void{
    this.getComments(this.newsId);
  }

  public getComments(newsId: number): void {
    this.commentService.getComments(newsId).subscribe(
      (response: Comment[]) => {
        this.comment = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public createComment(){
    
  }
}
