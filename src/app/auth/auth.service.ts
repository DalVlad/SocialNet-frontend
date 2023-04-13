import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtResposne } from './jwt-response';
import { PersonDTO } from './login-info';
import { SignupInfo } from './singnup-info';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  private loginUrl = 'http://localhost:8080/auth/login';
  private signupUrl = 'http://localhost:8080/auth/registration';

  attemptAuth(credentials: PersonDTO): Observable<JwtResposne> {
    return this.http.post<JwtResposne>(this.loginUrl, credentials, httpOptions)
  }

  signUp(info: SignupInfo): Observable<JwtResposne> {
    return this.http.post<JwtResposne>(this.signupUrl, info, httpOptions)
  }

}
