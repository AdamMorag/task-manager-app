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

  public getUserEvents(userId: string): Observable<Array<UserEvent>> {    
    const body = {
      userId: userId
    };

    return this._http.post("/api/calendars/getUserCalendar", body).map(response => {
      return response.json();
    });
  }

  public saveEvent(event: any, userId: string): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post("/api/calendars/saveEvent", {
      event: event,
      userId: userId
    });
  }
}
