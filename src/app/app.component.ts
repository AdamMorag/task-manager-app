import { Component } from '@angular/core';
import {
  Router, RouterEvent, NavigationStart,
  NavigationEnd, NavigationCancel, NavigationError
} from '@angular/router';
import { AuthService } from 'angular2-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public loading: boolean = true;
  public isAuthenticated: boolean = false;
  public imgSrc: String = "/assets/src/unknown.jpg";
  public loginName: String = "אורח";


  constructor(private router: Router, public socialLogin: AuthService) {
    this.isAuthenticated = (localStorage.getItem("isAuthenticated") == "true");

    if (this.isAuthenticated) {
      // login from local
      this.imgSrc = localStorage.getItem("image");
      this.loginName = localStorage.getItem("name");
    }

    this.router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  private navigationInterceptor(event: RouterEvent) {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }

    if (event instanceof NavigationEnd ||
      event instanceof NavigationCancel ||
      event instanceof NavigationError) {
      this.loading = false;
    }
  }

  loginHandler(isAuth: boolean) {
    this.isAuthenticated = isAuth;
    if (this.isAuthenticated) {
      // login from local
      this.imgSrc = localStorage.getItem("image");
      this.loginName = localStorage.getItem("name");
    } else {
      this.imgSrc = "/assets/src/unknown.jpg"
      this.loginName = "אורח";
    }
  }

  Logout() {
    this.socialLogin.logout().subscribe(
      (data)=>{
        localStorage.removeItem("uid");
        localStorage.removeItem("name");
        localStorage.removeItem("image");
        localStorage.setItem("isAuthenticated", "false");
        this.loginHandler(false);
      }
    )
  }
}
