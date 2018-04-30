import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import { CalendarsService } from '../Services/calendars.service';

@Injectable()
export class MyScheduleResolveService {

  constructor(private _calendarsService: CalendarsService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Promise<any> | boolean {
    return new Promise((resolve, reject) => {
      this._calendarsService.getUserEvents(localStorage.getItem("uid")).subscribe(userEvents => {
        if (userEvents) {
          resolve(userEvents);
        } else {
          this.router.navigate(['/']);
          return false;
        }
      });
    });
  }

}
