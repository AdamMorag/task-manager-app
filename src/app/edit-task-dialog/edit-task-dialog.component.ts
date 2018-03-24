import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ITask } from '../task/task.component';
import { Form } from '@angular/forms';
import { FormControl } from '@angular/forms/src/model';
import { BoardsService } from '../my-boards/boards.service';

export interface editTaskDialogInput {
  task: ITask,
  boardMemebers: string[]
}

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {
  
  private task: ITask;
  private boardMembers: any[];

  constructor( @Inject(MAT_DIALOG_DATA) public data: ITask,
    public dialogRef: MatDialogRef<EditTaskDialogComponent>,
    public _boardService: BoardsService) {      
    this.task = data;
    this._boardService.getBoard(data.boardId).subscribe(board => {
      this.boardMembers = board.boardMembers;
    });
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
    return firstUser.id === secondUser.id;
  }

}
