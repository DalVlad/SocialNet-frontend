import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { PersonDTO } from '../auth/login-info';
import { TokenStorageService } from '../auth/token-storage.service';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFaileuthd = false;
  errorMessage = '';
  private loginInfo!: PersonDTO;
  hello = '';
  
  constructor(private authService : AuthService, private tokenStorage: TokenStorageService, private personService: PersonService){}
  
  
  ngOnInit(): void {
    if(this.tokenStorage.getToken()){
      this.personService.getHello().subscribe(data => {
        this.hello = data;
      });
      this.isLoggedIn = true;
    }
  }

  onSubmit() {
    this.loginInfo = new PersonDTO(
      this.form.login,
      this.form.password
    );

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveLogin(this.loginInfo.login)
        this.tokenStorage.saveToken(data.jwt);
        this.isLoginFaileuthd = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      error => {
        this.errorMessage = error.error.message;
        this.isLoginFaileuthd = true;
      }
    );
  }
  reloadPage() {
    window.location.reload();
  }
}
