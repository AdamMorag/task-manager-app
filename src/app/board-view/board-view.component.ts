import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs/Subscription';
import { ITask } from "../task/task.component";
import { BoardsService } from "../my-boards/boards.service";
import { CreateTaskDialogComponent } from "../create-task-dialog/create-task-dialog.component";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-board-view',
  templateUrl: './board-view.component.html',
  styleUrls: ['./board-view.component.css']
})
export class BoardViewComponent implements OnInit, OnDestroy {

  private sub: Subscription;

  public boardId: number;

  public board: any;

  public doughnutChartLabels: string[];
  public doughnutChartData: number[];

  public doughnutChartType: string = 'doughnut';
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'light',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  constructor(private route: ActivatedRoute, private _boardService: BoardsService,
    public dialog: MatDialog) {
    const _boardView = this;

    this.sub = this.route.data.subscribe((data: { board: any }) => {
      this.board = data.board;
      this.doughnutChartData = [
        this.waitingTasks().length,
        this.activeTasks().length,
        this.doneTasks().length
      ]
    });

    this.doughnutChartLabels = ["Waiting", "Active", "Done"];
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public waitingTasks = (): ITask[] => {
    return this.filterTasksByStatus('waiting');
  }

  public activeTasks = (): ITask[] => {
    return this.filterTasksByStatus('active');
  }

  public doneTasks = (): ITask[] => {
    return this.filterTasksByStatus('done');
  }

  private filterTasksByStatus = (status: string): ITask[] => {
    if (!this.board)
      return [];

    return this.board.tasks.filter(task => task.status === status);
  }

  public openCreateTaskDialog() {
    let dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      data: {board: this.board},
      width: '90%',
      height: '80%'
    });
  }

}
