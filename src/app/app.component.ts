import { Component } from '@angular/core';
import {
  Router, RouterEvent, NavigationStart,
  NavigationEnd, NavigationCancel, NavigationError
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public loading: boolean = true;

  constructor(private router: Router) {
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
}