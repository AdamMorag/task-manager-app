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
  private event: UserEvent;

  startDate: Date;

  endDate: Date;

  constructor( @Inject(MAT_DIALOG_DATA) public data: UserEvent,
  public dialogRef: MatDialogRef<EditEventDialogComponent>)
  {            
    this.event = data;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
  }

  ngOnInit() {
  }

  public submitForm(): UserEvent {
    this.event.startDate = new Date(this.startDate);
    this.event.endDate = new Date(this.endDate);
    return this.event;
  }

  public cancelDialog() {
    this.dialogRef.close();
  }

}
