import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angular2-social-login';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

constructor(public socialLogin: AuthService) {     
}

  ngOnInit() {
  }

  googleLogin() {
    this.socialLogin.login('google').subscribe(
      (data: any) => {
        alert(JSON.stringify(data));
      }
    );
  }

}