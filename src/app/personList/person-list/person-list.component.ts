import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  constructor(private personService: PersonService) { }

  errorMessage: any;
  persons: any;

  ngOnInit(): void {
    this.errorMessage = null;
    this.personService.getAll().subscribe(
      data => {
        this.persons = data;
      },
      error => {
        this.errorMessage = error.error.message;
      });
  }

}
