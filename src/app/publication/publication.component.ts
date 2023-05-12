import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Community } from '../community/community';
import { Client } from '../member/Client';
import { Member } from '../member/member';
import { MemberService } from '../member/member.service';
import { Publication } from './publication';
import { PublicationService } from './publication.service';
import { PublicationEditComponent } from './publicationEdit.component';

@Component({
  selector: 'all-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit{

  public communities: Community[] = [];
  public publications: Publication[] = [];
  public members: Member[] = [];
  public name: String;

  @Input()
  community!: Community;
  @Input()
  canManage!: boolean;
  @Input()
  role!: String;
  publication!: Publication; 

  constructor(private publicationService: PublicationService,
              private activateRoute: ActivatedRoute,
              private publicationEditComponent : PublicationEditComponent,
              private router: Router) { 

    this.name = activateRoute.snapshot.params['name'];
  }


  ngOnInit(): void {
    this.getAllPublications();
}

  public getAllPublications(): void {
    this.publicationService.getAllPublication(this.name).subscribe(
      (response: Publication[]) => {
        this.publications = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public deletePublication(publicationId: number): void {
    this.publicationService.deletePublication(publicationId);
    window.location.href = `http://localhost:4200/community/${this.name}`;
  }



  public canSee(member_role: String): boolean {              
    if (this.role === "ADMIN" || this.role === "MODER" || this.role === "DONATER")
      return true;

    else if ((this.role === "SUBSCRIBER" || this.role === "NONSUB") && (member_role === "ADMIN" || member_role === "MODER" || member_role === "DONATER")) 
      return false
    else if (this.role === "SUBSCRIBER") 
      return true

    else if (this.role === "NONSUB" && member_role === "SUBSCRIBER") 
      return false;
    else if (this.role === "NONSUB" && member_role === "NONSUB") 
      return true;
      
    else return false;
  }
}