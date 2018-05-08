import { Component, OnInit, NgModule, Inject } from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef } from '@angular/material';
import { Task } from '../../Objects/Task';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css']
})
export class CreateTaskDialogComponent implements OnInit {

  private task: Task;
  private boardMembers: any[];
  private board: any;

  constructor(public dialogRef: MatDialogRef<CreateTaskDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.board = data;
    this.boardMembers = this.board.boardMembers;
    this.task = {
      taskId: "",
      title: "",
      boardName: this.board.title,
      boardId: this.board.boardId,
      owner: {
        uid: "",
        name: "",
        image: "",
        color: ""
      },
      status: "",
      overallTime: 0,
      remainingTime: 0
    };
   }

  ngOnInit() {
  }

  public submitForm() {
    return this.task;
  }

  public cancelDialog() {
    this.dialogRef.close();
  }

  public compareFn(firstUser: any, secondUser: any): boolean {
    return firstUser.uid === secondUser.uid;
  }
}
