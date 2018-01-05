import { Component, OnInit } from '@angular/core';
import { BoardsService } from "./boards.service";
import { trigger, state, style, transition, animate, keyframes } from "@angular/animations";

@Component({
  selector: 'app-my-boards',
  templateUrl: './my-boards.component.html',
  styleUrls: ['./my-boards.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        animate(500, keyframes([
          style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
          style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate(300, keyframes([
          style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
          style({opacity: 1, transform: 'translateX(-15px)', offset: 0.7}),
          style({opacity: 0, transform: 'translateX(100%)',  offset: 1.0})
        ]))
      ])
    ])
  ]
})
export class MyBoardsComponent implements OnInit {
  public loadingBoardsIManage: boolean = true;
  public loadingBoardsImSharedWith: boolean = true;  

  public boardsIManage: any = [];
  public boardsImShared: any = [];

  // For animations
  public next: number = 0;
  public staggeringboardsImShared: any[] = [];

  constructor(private _boardsService: BoardsService) { 
    this.boardsIManage = [];

    this._boardsService.getBoardsUserIsShareWith()
      .subscribe(boards => {
        this.boardsImShared = boards;
        this.loadingBoardsImSharedWith = false;
        this.doNext();
      });

    this._boardsService.getBoardsUserIsManagerOf()
      .subscribe(boards => {
        this.boardsIManage = boards;
        this.loadingBoardsIManage = false;
      });
  }

  public doNext() {
    if(this.next < this.boardsImShared.length) {
      this.staggeringboardsImShared.push(this.boardsImShared[this.next++]);
    }
    console.log("hello world!");
  }

  ngOnInit() {
  }

}