import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'angular2-social-login';
import { UsersService } from '../../Services/users.service';
import { User } from "../../Objects/User";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

public loadingLogin: boolean = false;
@Output() onLoginChange: EventEmitter<boolean> = new EventEmitter<boolean>();
private allUsers: User[];
constructor(public socialLogin: AuthService, private _userService: UsersService) {
  this._userService.getAllUsers().subscribe(res => {
    this.allUsers = res;
  }, err => {
    console.log(err);
    }
  );
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

        var randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);

        const userIndex = this.allUsers.findIndex(u => u.uid === data.uid);

        if (userIndex !== -1) {
          localStorage.setItem("isAuthenticated", "true");
          this.onLoginChange.emit(true);
        } else {
          this._userService.addUser({uid : data.uid, name: data.name, image: data.image, color: randomColor}).subscribe(res => {
            localStorage.setItem("isAuthenticated", "true");
            this.onLoginChange.emit(true);
          }, err => {
            console.log(err);
            }
          );
        }
      });
  }
}
