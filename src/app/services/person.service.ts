import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private url = 'http://localhost:8080/person';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.url);
  }

}
