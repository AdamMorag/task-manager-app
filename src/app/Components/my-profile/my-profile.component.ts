import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../Services/users.service';
import { User } from '../../Objects/User'

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  public loadingProfile: boolean = true;
  public currUser: User = new User("אורח", "/assets/src/unknown.jpg", "#fff");

  constructor(private _userService: UsersService) {
    if (localStorage.getItem("isAuthenticated") == "true") {
      // login from local
      this._userService.getUser(localStorage.getItem("uid")).subscribe(res => {
          this.currUser = res;
          this.loadingProfile = false;
      }, err => {
        console.log(err);
        }
      );
    }
  }

  ngOnInit() {
  }

}
