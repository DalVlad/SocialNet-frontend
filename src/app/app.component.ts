import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SocialNet-frontend';

  constructor(private tokenService: TokenStorageService) { }

  token: any;
  login: any;

  ngOnInit(): void {
    this.token = this.tokenService.getToken();
    this.login = this.tokenService.getLogin();
  }

  logout() {
    this.tokenService.signOut();
    window.location.reload;
  }





}
