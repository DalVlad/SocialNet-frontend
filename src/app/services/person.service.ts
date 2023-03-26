import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private helloUrl = 'http://localhost:8080/hello';

  constructor(private http: HttpClient) { }

  getHello(): Observable<string> {
    return this.http.get(this.helloUrl, {responseType: 'text'});
  }

}
