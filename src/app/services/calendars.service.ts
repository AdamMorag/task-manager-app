import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export interface UserEvent {
  id: string,
  startDate: Date,
  endDate: Date,
  title: string
}

@Injectable()
export class CalendarsService {

  constructor(private _http: Http) { }

  public getUserEvents(): Observable<Array<UserEvent>> {    
    const body = {
      userId: "1"
    };

    return this._http.post("/api/calendars/getUserCalendar", body).map(response => {
      return response.json();
    });
  }

}
