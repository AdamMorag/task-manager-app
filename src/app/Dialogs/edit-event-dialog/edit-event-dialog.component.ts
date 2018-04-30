import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserEvent } from '../../Objects/UserEvent';
import { Form } from '@angular/forms';
import { FormControl } from '@angular/forms/src/model';

@Component({
  selector: 'app-edit-event-dialog',
  templateUrl: './edit-event-dialog.component.html',
  styleUrls: ['./edit-event-dialog.component.css']
})
export class EditEventDialogComponent implements OnInit {
  event: UserEvent;

  constructor(public dialogRef: MatDialogRef<EditEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any)
    {
      this.event = data;
    }

  ngOnInit() {
  }

  public submitForm(): UserEvent {
    this.event.startDate = new Date(this.event.startDate);
    this.event.endDate = new Date(this.event.endDate);
    return this.event;
  }

  public cancelDialog() {
    this.dialogRef.close();
  }

}
