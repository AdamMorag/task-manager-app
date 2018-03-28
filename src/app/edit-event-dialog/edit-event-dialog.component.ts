import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserEvent } from '../services/calendars.service';

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
    return this.event;
  }

  public cancelDialog() {
    this.dialogRef.close();
  }

}
