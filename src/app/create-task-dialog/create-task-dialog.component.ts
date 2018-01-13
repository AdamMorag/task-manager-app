import { Component, OnInit, NgModule, Inject } from '@angular/core';
import { BoardsService } from "../my-boards/boards.service";
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css']
})
export class CreateTaskDialogComponent implements OnInit {

  constructor(private _boardsService: BoardsService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  title: string = '';
  status: string = 'waiting';
  overallTime: number = 0;
  remainingTime: number = 0;
  ownerId: string = '';

  ngOnInit() {
  }

  public setValue() {
    const {title, status, overallTime, remainingTime, ownerId, data: {board: {title: boardTitle, boardId, boardMembers}}} = this

    const newTask = {
      title,
      status,
      overallTime,
      remainingTime,
      boardId,
      boardName: boardTitle,
      ownerId,
      ownerName: boardMembers.find(member => member.id === ownerId).name
    }

    this._boardsService.addNewTask(newTask)
  }
}
