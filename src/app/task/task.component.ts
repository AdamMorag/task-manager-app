import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BoardsService } from "../my-boards/boards.service";
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';
import { DeleteTaskDialogComponent } from '../delete-task-dialog/delete-task-dialog.component';
import { TasksService } from "../my-tasks/tasks.service";
import { MatSnackBar } from "@angular/material";
import { shouldCallLifecycleInitHook } from '@angular/core/src/view';

export interface ITask {
  taskId: string,
  title: string,
  boardName: string,
  boardId: string,
  owner: {
    id: string,
    name: string
  },
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

  @Output() onDeleted = new EventEmitter<string>();

  constructor(private _boardsService: BoardsService, public dialog: MatDialog, public _taskService: TasksService, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  public calculateCompletedPrecentage(task: ITask): number {
    return (task.overallTime - task.remainingTime) * 100 / task.overallTime;
  }

  public openEditTaskDialog() {

    let editDialog = this.dialog.open(EditTaskDialogComponent, {
      data: JSON.parse(JSON.stringify(this.task))
    });

    editDialog.afterClosed().subscribe((result: ITask) => {
      if (result) {
        this.snackBar.open('מעדכן משימה', undefined, {
          direction: 'rtl'
        });

        this._taskService.updateTask(result).subscribe(() => {
          Object.assign(this.task, result);
          this.snackBar.open('משימה עודכנה בהצלחה', undefined, {
            direction: 'rtl',
            duration: 300
          });
        }, (err) => {
          this.snackBar.open('התרחשה שגיאה בזמן עדכון המשימה', undefined, {
            direction: 'rtl',
            duration: 300
          });
          console.log(err);
        });
      }
    });
  }

  public openDeleteTaskDialog() {
    this.dialog.open(DeleteTaskDialogComponent).afterClosed().subscribe((shouldDelete: boolean) => {
      if (shouldDelete) {
        this._boardsService.removeTask(this.task.boardId, this.task.taskId)
          .subscribe(() => {
            this.onDeleted.emit(this.task.taskId);
            this.snackBar.open("משימה נמחקה בהצלחה", undefined ,{
              direction: 'rtl',
              duration: 500
            });
          });
      }
    });
  }
}
