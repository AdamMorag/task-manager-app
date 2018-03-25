import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export interface UserEvent {
  eventId: string,
  startDate: Date,
  endDate: Date,
  title: string
}

@Injectable()
export class CalendarsService {

  constructor(private _http: Http) { }

  public getUserEvents(uid: string): Observable<Array<UserEvent>> {
    const body = {
      userId: uid
    };

    return this._http.post("/api/calendars/getUserCalendar", body).map(response => {
      return response.json();
    });
  }

  public saveEvent(event: any, uid: string): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post("/api/calendars/saveEvent", {userId: uid, event : event});
  }
}
