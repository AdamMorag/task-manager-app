import { Component, OnInit } from '@angular/core';

import { CalendarEvent } from 'angular-calendar';

import { UserEvent } from '../services/calendars.service';

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
import { CalendarsService } from '../services/calendars.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-my-schedule',
  templateUrl: './my-schedule.component.html',
  styleUrls: ['./my-schedule.component.css']
})
export class MyScheduleComponent implements OnInit {

  private sub: Subscription;
  private refresh: Subject<any> = new Subject();

  events: Array<CalendarEvent<any>>;
  viewDate = new Date();
  activeDayIsOpen: boolean = false;

  constructor(private route: ActivatedRoute) {
    this.sub = this.route.data.subscribe((data: {userEvents: any}) => {
      this.events = data.userEvents.map(ev => {
        return {
          id: ev.id,
          start: new Date(ev.startDate),
          end: new Date(ev.endDate),
          title: ev.title,
          color: {
            primary: "red",
            secondary: "yellow"
          }
        };
      });
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
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

  public addEvent(date: Date): void {
    // Open modal, get details, save to server
    this.events.push({
      start: date,
      title: 'New event',
      color: {
        primary:"red",
        secondary: "yellow"
      }
    });
    this.refresh.next();
  }
}
