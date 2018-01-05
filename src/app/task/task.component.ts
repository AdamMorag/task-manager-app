import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';
import { DeleteTaskDialogComponent } from '../delete-task-dialog/delete-task-dialog.component';

export interface ITask {
  title: string,
  boardName: string,
  boardId: number,
  owner: string,
  status: string,
  overallTime: number,
  remainingTime: number
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task: ITask;
  @Input() showProgressBar: boolean;
  @Input() showEdit: boolean;
  @Input() showDelete: boolean;
  @Input() showOpenBoard: boolean;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  public calculateCompletedPrecentage(task: ITask): number {
    return (task.overallTime - task.remainingTime) * 100 / task.overallTime;
  }

  public openEditTaskDialog() {
    this.dialog.open(EditTaskDialogComponent, {
      width: '80%',
      height: '80%'
    });
  }

  public openDeleteTaskDialog() {
    this.dialog.open(DeleteTaskDialogComponent, {
      width: '30%',
      height: '30%'
    });
  }
}
