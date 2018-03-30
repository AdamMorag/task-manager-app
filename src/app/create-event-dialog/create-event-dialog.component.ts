import { Component, OnInit, Inject } from '@angular/core';
import { UserEvent } from '../services/calendars.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-event-dialog',
  templateUrl: './create-event-dialog.component.html',
  styleUrls: ['./create-event-dialog.component.css']
})
export class CreateEventDialogComponent implements OnInit {

  title: FormControl = new FormControl(null, [
    Validators.required
  ]);

  startDate: Date;

  endDate: Date;

  constructor(public dialogRef: MatDialogRef<CreateEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { date: Date }) {
    this.startDate = data.date;
    this.endDate = data.date;
  }

  ngOnInit() {
  }

  public submitForm(): UserEvent {
    return {
      eventId: "",
      title: this.title.value,
      startDate: this.startDate,
      endDate: this.endDate
    }
  }

  public cancelDialog() {
    this.dialogRef.close();
  }

  public formIsValid(): boolean {
    const valid = !this.title.hasError('required');

    return valid;
  }
}
