import { Component, OnInit } from '@angular/core';
import { BoardsService } from "../../Services/boards.service";
import { trigger, state, style, transition, animate, keyframes } from "@angular/animations";
import { MatDialog } from '@angular/material/dialog';
import { CreateBoardDialogComponent } from "../../Dialogs/create-board-dialog/create-board-dialog.component";
import { MatSnackBar } from "@angular/material";
import { DeleteBoardDialogComponent } from '../../Dialogs/delete-board-dialog/delete-board-dialog.component';

@Component({
  selector: 'app-my-boards',
  templateUrl: './my-boards.component.html',
  styleUrls: ['./my-boards.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        animate(500, keyframes([
          style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(15px)', offset: 0.3 }),
          style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
        ]))
      ]),
      transition('* => void', [
        animate(300, keyframes([
          style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(-15px)', offset: 0.7 }),
          style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
        ]))
      ])
    ])
  ]
})
export class MyBoardsComponent implements OnInit {
  public loadingBoardsIManage: boolean = true;
  public loadingBoardsImSharedWith: boolean = true;

  public boardsIManage: any[] = [];
  public boardsImShared: any[] = [];

  // For animations
  public next: number = 0;
  public staggeringboardsImShared: any[] = [];

  constructor(private _boardsService: BoardsService, public dialog: MatDialog, public snackBar: MatSnackBar) {
    this.boardsIManage = [];

    this.loadBoardsUserIsSharedWith();
    this.loadBoardsUserIsOwnerOf();
  }

  public doNext() {
    if (this.next < this.boardsImShared.length) {
      this.staggeringboardsImShared.push(this.boardsImShared[this.next++]);
    }
  }

  public openCreateBoardDialog() {
    const dialogRef = this.dialog.open(CreateBoardDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const snackBarRef = this.snackBar.open("שומר לוח", undefined, {
          direction: 'rtl'
        });
        this._boardsService.saveBoard(result)
          .subscribe(res => {
            this.snackBar.open("לוח נשמר בהצלחה", undefined, {
              direction: 'rtl',
              duration: 300
            });
            this.loadBoardsUserIsOwnerOf();
            this.loadBoardsUserIsSharedWith();
          }, err => {
            console.log(err);
            this.snackBar.open("התרחשה שגיאה בזמן שמירת הלוח", undefined, {
              direction: 'rtl',
              duration: 300
            });
          });
      }
    });
  }

  public openDeleteBoardDialog(boardId: string) {
    this.dialog.open(DeleteBoardDialogComponent).afterClosed().subscribe((shouldDelete) => {
      if (shouldDelete) {
        this.snackBar.open("מוחק לוח");
        this._boardsService.deleteBoard(boardId).subscribe(wasDeleted => {
          if (wasDeleted) {
            this.snackBar.open("הלוח נמחק בהצלחה", undefined ,{
              duration: 500,
              direction: 'rtl'
            });
            const i = this.boardsIManage.findIndex(b => b.boardId === boardId);
            this.boardsIManage.splice(i, 1);
          } else {
            this.snackBar.open("התרחשה שגיאה", undefined ,{
              duration: 500,
              direction: 'rtl'
            })
          }
        })
      }
    });
  }

  private loadBoardsUserIsSharedWith() {
    this._boardsService.getBoardsUserIsShareWith(localStorage.getItem("uid"))
      .subscribe(boards => {
        this.boardsImShared = boards;
        this.loadingBoardsImSharedWith = false;
        this.doNext();
      });
  }

  private loadBoardsUserIsOwnerOf() {
    this._boardsService.getBoardsUserIsManagerOf(localStorage.getItem("uid"))
      .subscribe(boards => {
        this.boardsIManage = boards;
        this.loadingBoardsIManage = false;
      });
  }

  ngOnInit() {
  }

}
