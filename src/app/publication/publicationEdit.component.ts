import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Publication } from './publication';



@Component({
  selector: 'create-form',
  templateUrl: './publicationEdit.component.html',
  styleUrls: ['../app.component.css']
})
export class PublicationEditComponent implements OnInit{
    form!: FormGroup;
    private apiServerUrl = 'http://localhost:8080';
    editedPublication!: Publication;
    name!: String;
    publicationId!: number;
    publication!: Publication;
    newMessage!: String;
    newMember_role!: String;
    newCreated_at!: Date;

    constructor(private http: HttpClient,
                private activateRoute: ActivatedRoute,
                private route: ActivatedRoute)
    {
        this.name = activateRoute.snapshot.params['name']
        this.publicationId = activateRoute.snapshot.params['id']

    };


    ngOnInit(): void {
        this.http.get<Publication>(`${this.apiServerUrl}/community/${this.name}/publications/${this.publicationId}`).subscribe(
            (response: Publication) => this.doDataInsert(response)
        )
        this.form = new FormGroup({
            message: new FormControl(),
            member_role: new FormControl()           
        });

    }



    public doDataInsert(publication: Publication){

        this.form = new FormGroup({
            message: new FormControl(publication.message),
            member_role: new FormControl(publication.member_role)           
        });
        this.newCreated_at = publication.createdAt;
    }


    public submitEdit(): void {
        this.newMessage = String(this.form.get('message')?.value);                         
        this.newMember_role = String(this.form.get('member_role')?.value);

        this.editedPublication = {id: this.publicationId,  member_role: this.newMember_role, createdAt: this.newCreated_at, message: this.newMessage, community_name: this.name}  
                                              
        this.http.put<Publication>(`${this.apiServerUrl}/community/${this.name}/publications/update`, this.editedPublication).subscribe()

        window.location.href = `http://localhost:4200/community/${this.name}`;
    }


    

}
