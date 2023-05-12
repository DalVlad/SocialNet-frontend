import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Community } from './community';
import { CommunityService } from './community.service';
import { Member } from '../member/member';
import { MemberService } from '../member/member.service';

@Component({
  selector: 'app2-root',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})


export class CommunityComponent implements OnInit{

  public communities: Community[] = [];
  public members: Member[] = [];

  constructor(private communityService: CommunityService,
              private memberService: MemberService) { }

  ngOnInit(): void {
      this.getAllCommunity();
  }



  public getAllCommunity(): void {
    this.communityService.getAllCommunity().subscribe(
      (response: Community[]) => {
        this.communities = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

 

}
