import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { PersonDTO } from '../auth/login-info';
import { TokenStorageService } from '../auth/token-storage.service';
import { Community } from '../community/community';
import { CommunityService } from '../community/community.service';
import { Client } from '../member/Client';
import { Member } from '../member/member';
import { MemberService } from '../member/member.service';
import { MemberRole } from '../member/memberRole';
import { Publication } from '../publication/publication';

@Component({
  selector: 'page-app',
  templateUrl: './communityPage.component.html',
  styleUrls: ['./communityPage.component.css']
})
export class CommunityPageComponent implements OnInit{

  public community!: Community;
  public personDTO: PersonDTO = {id: -1, login:'', password: ''};
  public members: Member[] = [];
  public name: string;

  id: number = 0;
  role!: String;
  canManage: boolean = false;
  isSubscriber: boolean = false;

  constructor(private communityService: CommunityService,
              private memberService: MemberService,
              private activateRoute: ActivatedRoute,
              private http: HttpClient,
              private tokenService: TokenStorageService,
              ) { 

    this.http.get<PersonDTO>(`http://localhost:8080/member/getUserId/${this.tokenService.getLogin()}`).subscribe((response: PersonDTO) =>{
      this.id = response.id
      this.controlPosts(response.id);
    })

    this.name = activateRoute.snapshot.params['name'];
  }


  async ngOnInit(): Promise<void> {

    this.getCommunityByName(this.name);
    
  }


  public getCommunityByName(name: string): void {
    this.communityService.getCommunityByName(name).subscribe(
      (response: Community) => {
        this.community = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }




  public async controlPosts(id: number): Promise<void> {
    console.log(this.id);
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    let params = new HttpParams().set("id", id)
    await this.http.get<MemberRole>(`http://localhost:8080/member/${this.name}/getRole`, {headers, params}).subscribe((response: MemberRole) =>{
      this.role = response.role
      console.log(this.role);
      if (this.role == "ADMIN" || this.role == "MODER"){
        this.canManage = true;
      }
      if (!(this.role == "NONSUB")){
        this.isSubscriber = true;
      }
    })
  }





  public doSubscribe(): void {
    console.log("doSubs",this.id)
    this.personDTO.id = this.id;
    this.http.post<PersonDTO>(`http://localhost:8080/member/${this.name}/subscribe`, this.personDTO).subscribe()
    window.location.href = `http://localhost:4200/community/${this.name}`
  }



  public doUnsubcribe(): void {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    let params = new HttpParams().set("id", this.id)
    this.http.delete<PersonDTO>(`http://localhost:8080/member/${this.name}/unsubscribe`, {headers, params}).subscribe()
    window.location.href = `http://localhost:4200/community/${this.name}`
  }

  public setNewRole(): void {
    this.role = "NONSUB";
    this.personDTO.id = this.id;
    this.http.patch<PersonDTO>(`http://localhost:8080/member/${this.name}/${this.role}`, this.personDTO).subscribe()
  }
}
