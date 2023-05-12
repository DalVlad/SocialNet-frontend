import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Community } from '../community/community';
import { Client } from './Client';
import { Member } from './member';
import { MemberService } from './member.service';

@Component({
  selector: 'change-role',
  templateUrl: './changeRole.component.html',
  styleUrls: ['./memberCommunityPage.component.css']
})


export class ChangeRoleComponent implements OnInit{

  public members : Member[] = [];
  memberCount : number = 0;
  communityId: number = 0;
  public client: Client = {id:-1};
  id!: number;
  role!: String;
  selectedOption!: String;
  selectedOption2!: String;
  selectedOption3!: String;
  selectedOption4!: String;
  private apiServerUrl = 'http://localhost:8080';
  constructor(private memberService: MemberService,
              private activateRoute: ActivatedRoute,
              private http: HttpClient){ 

    this.communityId = activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getCountMembers(this.communityId);
    this.getAllMembers(this.communityId);
  }

  public getCountMembers(communityID: number): void {
    this.memberService.getAllMembers(communityID).subscribe(
      (response: Member[]) => {
        this.memberCount = response.length;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getAllMembers(communityID: number): void {
    this.memberService.getAllMembers(communityID).subscribe(
      (response: Member[]) => {
        this.members = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  





  public changeRoleTo(clientID: number, role: String): void {
    this.client.id = clientID;

    this.http.patch<Client>(`${this.apiServerUrl}/member/${this.communityId}/${role}`, this.client).subscribe()
    window.location.href = `http://localhost:4200/community/${this.communityId}/members`;
  }
}
