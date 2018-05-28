import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-board-dialog',
  templateUrl: './delete-board-dialog.component.html',
  styleUrls: ['./delete-board-dialog.component.css']
})
export class DeleteBoardDialogComponent implements OnInit {

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
