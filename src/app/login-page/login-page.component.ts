import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angular2-social-login';
import { UsersService } from '../services/users.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

constructor(public socialLogin: AuthService, private _userService: UsersService) {
}

  ngOnInit() {
  }

  googleLogin() {
    this.socialLogin.login('google').subscribe(
      (data: any) => {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("uid", data.uid);
        localStorage.setItem("name", data.name);
        localStorage.setItem("image", data.image);
        
        this._userService.addUser({uid : data.uid, name: data.name, image: data.image}).subscribe(res => {
          alert("משתמש נשמר בהצלחה");
        }, err => {
          console.log(err);
          }
        );
        // TODO: redirect to my-boards
        // TODO: how to refresh title name ?!
        //alert(JSON.stringify(data));
      });
  }
}
