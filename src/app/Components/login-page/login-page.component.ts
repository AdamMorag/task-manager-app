import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'angular2-social-login';
import { UsersService } from '../../Services/users.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

public loadingLogin: boolean = false;
@Output() onLoginChange: EventEmitter<boolean> = new EventEmitter<boolean>();

constructor(public socialLogin: AuthService, private _userService: UsersService) {
}

  ngOnInit() {
  }

  googleLogin() {
    this.loadingLogin = true;
    this.socialLogin.login('google').subscribe(
      (data: any) => {
        localStorage.setItem("uid", data.uid);
        localStorage.setItem("name", data.name);
        localStorage.setItem("image", data.image);

        this._userService.addUser({uid : data.uid, name: data.name, image: data.image}).subscribe(res => {
          localStorage.setItem("isAuthenticated", "true");
          this.onLoginChange.emit(true);
        }, err => {
          console.log(err);
          }
        );
      });
  }
}
