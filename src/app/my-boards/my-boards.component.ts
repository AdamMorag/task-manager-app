import { Component, OnInit } from '@angular/core';
import { BoardsService } from "./boards.service";

@Component({
  selector: 'app-my-boards',
  templateUrl: './my-boards.component.html',
  styleUrls: ['./my-boards.component.css']
})
export class MyBoardsComponent implements OnInit {
  public boardsIManage: any = [];
  public boardsImShared: any = [];

  constructor(private _boardsService: BoardsService) { 
    this.boardsIManage = [];

    this._boardsService.getBoardsUserIsShareWith()
      .subscribe(boards => this.boardsImShared = boards);

    this._boardsService.getBoardsUserIsManagerOf()
      .subscribe(boards => this.boardsIManage = boards);
  }

  ngOnInit() {
  }

}