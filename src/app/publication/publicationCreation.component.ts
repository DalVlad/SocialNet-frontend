import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Publication } from './publication';



@Component({
  selector: 'create-form',
  templateUrl: './publicationCreation.component.html',
  styleUrls: ['../app.component.css']
})
export class PublicationCreationComponent implements OnInit{
    form!: FormGroup;
    private apiServerUrl = 'http://localhost:8080';

    creatingPublication!: Publication;
    message! : string;
    member_role! : string;
    name!: String;

    constructor(private http: HttpClient,
                private activateRoute: ActivatedRoute){
        this.name = activateRoute.snapshot.params['name']
    };

    ngOnInit(): void {
        this.form = new FormGroup({
            message: new FormControl(),
            member_role: new FormControl()           
        });

    }

    public createPublication(): void{

        this.message = String(this.form.get('message')?.value);                         
        this.member_role = String(this.form.get('member_role')?.value);
        

        this.creatingPublication = {id: -1,  member_role: this.member_role, createdAt: new Date(), message: this.message, community_name: this.name}  
                                              

        this.http.post<Publication>(`${this.apiServerUrl}/community/createPublication`, this.creatingPublication)
        .subscribe()

        window.location.href = `http://localhost:4200/community/${this.name}`;
    }

}
