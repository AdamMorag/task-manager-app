import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-event-dialog',
  templateUrl: './delete-event-dialog.component.html',
  styleUrls: ['./delete-event-dialog.component.css']
})
export class DeleteEventDialogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public submitForm(): boolean {
    return true;
  }

  public cancelDialog(): boolean {
    return false;
  }
}
