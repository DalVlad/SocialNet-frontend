import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Community } from '../community/community';
import { Member } from './member';
import { MemberService } from './member.service';

@Component({
  selector: 'member-community-page',
  templateUrl: './memberCommunityPage.component.html',
  styleUrls: ['./memberCommunityPage.component.css']
})


export class MemberCommunityPageComponent implements OnInit{

  @Input() communityID: number = -1;
  public members : Member[] = [];
  memberCount : number = 0;

  constructor(private memberService: MemberService){
  }

  ngOnInit(): void {
    this.getCountMembers(this.communityID);
    this.getAllMembers(this.communityID);
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
  

}
