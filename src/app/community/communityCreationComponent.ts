import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PersonDTO } from '../auth/login-info';
import { TokenStorageService } from '../auth/token-storage.service';

import { CommunityCreationDTO } from './communityCreationDTO';


@Component({
  selector: 'create-form',
  templateUrl: './communityCreation.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityCreationComponent implements OnInit{
    form!: FormGroup;
    private apiServerUrl = 'http://localhost:8080';

    id!: number;
    toTransf2!: CommunityCreationDTO;
    description! : string;
    title!: string;
    name!: string;

    constructor(private http: HttpClient,
        private tokenService: TokenStorageService){
        this.http.get<PersonDTO>(`http://localhost:8080/member/getUserId/${this.tokenService.getLogin()}`).subscribe((response: PersonDTO) =>{
            this.id = response.id
    })}

    ngOnInit(): void {
        this.form = new FormGroup({
            description: new FormControl(),
            name: new FormControl(),
            title: new FormControl()
        });

    }

    public createCommunity(): void{
        this.description = String(this.form.get('description')?.value);
        this.name = String(this.form.get('name')?.value);
        this.title = String(this.form.get('title')?.value);

        this.toTransf2 = {communityDTO: {id: -1, description: this.description, title: this.title, name: this.name},    
                          memberDTO: {id: this.id, name: '', memberRole:''}};                                                     

        this.http.post<CommunityCreationDTO>(`${this.apiServerUrl}/community/create`, this.toTransf2)
        .subscribe()
        window.location.href = 'http://localhost:4200/AllCommunities'
    }

}
