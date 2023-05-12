import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PersonDTO } from '../auth/login-info';
import { TokenStorageService } from '../auth/token-storage.service';

import { Publication } from '../publication/publication';
import { CommentOnPublication } from './commentOnPublication';
import { CommentOnPublicationService } from './commentOnPublication.service';

@Component({
  selector: 'comment-on-publication',
  templateUrl: './commentOnPublication.component.html',
  styleUrls: ['./commentOnPublication.component.css']
})
export class CommentOnPublicationComponent implements OnInit{

  public publication!: Publication;

  public commentsOnPublication: CommentOnPublication[] = [];
  @Input()
  public publicationID!: number;
  @Input()
  public canManage: boolean = false;

  form!: FormGroup;
  commentOnPublication!: CommentOnPublication;
  id! : number;

  textOfComment!: string;
  name!: String;

  constructor(private commentOnPublicationService: CommentOnPublicationService,
              private activateRoute: ActivatedRoute,
              private tokenService: TokenStorageService,
              private http: HttpClient) { 
    this.name = activateRoute.snapshot.params['name'];
  }


  ngOnInit(): void {
    this.getComments(this.publicationID);

    this.http.get<PersonDTO>(`http://localhost:8080/member/getUserId/${this.tokenService.getLogin()}`).subscribe((response: PersonDTO) =>{this.id = response.id});

    this.form = new FormGroup({
      textOfComment: new FormControl()

    
  });
  }


  public getComments(publicationID: number): void {
    this.commentOnPublicationService.getComments(publicationID).subscribe(
      (response: CommentOnPublication[]) => {
        this.commentsOnPublication = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public createComment(): void {
    this.textOfComment = String(this.form.get('textOfComment')?.value);

    this.commentOnPublication = {id: -1, person_id: this.id, textOfComment: this.textOfComment, publication_id: this.publicationID}

    this.commentOnPublicationService.createComment(this.publicationID, this.commentOnPublication);
    window.location.href = `http://localhost:4200/community/${this.name}`;
  }


  public deleteComment(commentId: number): void {
    this.commentOnPublicationService.deleteComment(commentId);
    window.location.href = `http://localhost:4200/community/${this.name}`;
  }







}
