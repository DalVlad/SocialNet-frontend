import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SocialNet-frontend';

  constructor(private tokenService: TokenStorageService){}

  token: any;
  
  ngOnInit(): void {
    this.token = this.tokenService.getToken();
  }

  logout(){
    this.tokenService.signOut();
    window.location.reload;
  }





}
