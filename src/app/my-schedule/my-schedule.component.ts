import { Component, OnInit } from '@angular/core';

import { CalendarEvent } from 'angular-calendar';

import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format
} from 'date-fns';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-my-schedule',
  templateUrl: './my-schedule.component.html',
  styleUrls: ['./my-schedule.component.css']
})
export class MyScheduleComponent implements OnInit {

  events: Array<CalendarEvent<any>>;
  viewDate = new Date();
  activeDayIsOpen: boolean = false;    

  constructor() {               

      var event: CalendarEvent = {
        start: new Date(),
        title: "Hello world",
        color: {
          primary: "red",
          secondary: "yellow"
        }
      };      

      var secondEvent = JSON.parse(JSON.stringify(event));
      secondEvent.end = this.addDays(event.start, 1);
      

      this.events = [event, event, secondEvent];
    }  

  ngOnInit() {
  }

  public dayClicked({
    date,
    events
  }: {
    date: Date;
    events: Array<CalendarEvent<any>>;
  }) {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  public addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
