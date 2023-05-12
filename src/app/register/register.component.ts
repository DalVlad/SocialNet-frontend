import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { PersonDTO } from '../auth/login-info';
import { SignupInfo } from '../auth/singnup-info';
import { TokenStorageService } from '../auth/token-storage.service';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form: any = {};
  errorMessage = '';
  private loginInfo!: SignupInfo;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private personService: PersonService) { }


  onSubmit() {
    this.loginInfo = new SignupInfo(
      this.form.login,
      this.form.password,
      this.form.user_name
    );

    this.authService.signUp(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.jwt);
        this.reloadPage();
      },
      error => {
        this.errorMessage = error.error.message;
      }
    );
  }
  reloadPage() {
    window.location.reload();
  }

}
