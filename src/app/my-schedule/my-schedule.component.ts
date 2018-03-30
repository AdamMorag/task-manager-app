import { Component, OnInit } from '@angular/core';

import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';

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
  format,
  subDays
} from 'date-fns';

import { Observable } from 'rxjs/Observable';
import { CalendarsService } from '../services/calendars.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CreateEventDialogComponent } from '../create-event-dialog/create-event-dialog.component';
import { DeleteEventDialogComponent } from '../delete-event-dialog/delete-event-dialog.component';
import { EditEventDialogComponent } from '../edit-event-dialog/edit-event-dialog.component';

@Component({
  selector: 'app-my-schedule',
  templateUrl: './my-schedule.component.html',
  styleUrls: ['./my-schedule.component.css']
})
export class MyScheduleComponent implements OnInit {

  private sub: Subscription;
  private refresh: Subject<any> = new Subject();
  view: string = 'month';
  events: Array<CalendarEvent<any>>;
  viewDate = new Date();
  activeDayIsOpen: boolean = true;

  constructor(private _calenderService: CalendarsService, private route: ActivatedRoute, private dialog: MatDialog,
    private snackBar: MatSnackBar) {
    this.sub = this.route.data.subscribe((data: { userEvents: any }) => {
      this.events = data.userEvents.map(ev => this.mapUserEventToCalendarEvent(ev));
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private mapUserEventToCalendarEvent(userEvent: UserEvent): CalendarEvent {
    return {
      id: userEvent.eventId,
      start: new Date(userEvent.startDate),
      end: new Date(userEvent.endDate),
      title: userEvent.title,
      color: {
        primary: "red",
        secondary: "yellow"
      },
      actions: [
        {
          label: '<i class="fas fa-edit"></i>',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            this.openEditEventDialog(userEvent);
          }
        },
        {
          label: '<i class="fa fa-fw fa-times"></i>',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            this.openDeleteEventDialog(event.id.toString());
          }
        }
      ]
    };
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

  public addEvent(day: { date: Date, events: CalendarEvent[] }): void {

    let dialogRef = this.dialog.open(CreateEventDialogComponent, {
      data: {
        date: day.date
      }
    });

    dialogRef.afterClosed().subscribe((result: UserEvent) => {
      if (result) {
        this.snackBar.open('מייצר אירוע', undefined, {
          direction: 'rtl'
        });

        this._calenderService.saveEvent(result, localStorage.getItem("uid"))
          .subscribe(res => {
            this.snackBar.open("אירוע נשמר בהצלחה", undefined, {
              direction: 'rtl',
              duration: 300
            });
          }, err => {
            console.log(err);
            this.snackBar.open("התרחשה שגיאה בזמן שמירת האירוע", undefined, {
              direction: 'rtl',
              duration: 300
            });
          });

        // send request to server
        this.events.push(this.mapUserEventToCalendarEvent(result));
        this.refresh.next();
        this.snackBar.dismiss();
      }
    });
  }

  public openDeleteEventDialog(eventId: string) {
    this.dialog.open(DeleteEventDialogComponent).afterClosed().subscribe((shouldDelete: boolean) => {
      if (shouldDelete) {
        this._calenderService.removeEvent(localStorage.getItem("uid"), eventId)
          .subscribe(() => {
            //this.onDeleted.emit(this.task.taskId);
            this.snackBar.open("אירוע נמחק בהצלחה", undefined ,{
              direction: 'rtl',
              duration: 500
            });
          });

          this.onEventDeleted(eventId);
          this.refresh.next();
          this.snackBar.dismiss();
      }
    });
  }

  public openEditEventDialog(eventToUpdate: UserEvent) {

    let editDialog = this.dialog.open(EditEventDialogComponent, {
      data: JSON.parse(JSON.stringify(eventToUpdate))
    });

    editDialog.afterClosed().subscribe((result: UserEvent) => {
      if (result) {
        this.snackBar.open('מעדכן אירוע', undefined, {
          direction: 'rtl'
        });

        this._calenderService.updateEvent(result, localStorage.getItem("uid")).subscribe(() => {
          Object.assign(eventToUpdate, result);
          this.snackBar.open('אירוע עודכן בהצלחה', undefined, {
            direction: 'rtl',
            duration: 300
          });
        }, (err) => {
          this.snackBar.open('התרחשה שגיאה בזמן עדכון האירוע', undefined, {
            direction: 'rtl',
            duration: 300
          });
          console.log(err);
        });


        this.refresh.next();
        this.snackBar.dismiss();
      }
    });
  }

  public onEventDeleted(eventId: string): void {
    const eventIndex = this.events.findIndex(t => t.id === eventId);
    this.events.splice(eventIndex, 1);
  }
}
