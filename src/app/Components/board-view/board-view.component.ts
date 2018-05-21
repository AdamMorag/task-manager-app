import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs/Subscription';
import { Task } from "../../Objects/Task";
import { BoardsService } from "../../Services/boards.service";
import { CreateTaskDialogComponent } from "../../Dialogs/create-task-dialog/create-task-dialog.component";
import { StatisticsDialogComponent } from "../../Dialogs/statistics-dialog/statistics-dialog.component";
import { MatDialog } from '@angular/material/dialog';
import { trigger, state, style, transition, animate, keyframes } from "@angular/animations";
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material';
import { TasksService } from '../../Services/tasks.service';

@Component({
  selector: 'app-board-view',
  templateUrl: './board-view.component.html',
  styleUrls: ['./board-view.component.css'],
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
export class BoardViewComponent implements OnInit, OnDestroy {

  private sub: Subscription;

  public columnNum: number;
  public chartColspan: number;

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
    public dialog: MatDialog, media: MediaMatcher, public _taskService: TasksService,
    public snackBar: MatSnackBar) {
    this.sub = this.route.data.subscribe((data: { board: any }) => {
      this.board = data.board;
      this.doughnutChartData = [
        this.waitingTasks().length,
        this.activeTasks().length,
        this.doneTasks().length
      ]
    });

    this.doughnutChartLabels = ["Waiting", "Active", "Done"];

    const mediaQueryList = media.matchMedia('(min-width: 100px)');

    this.handleMediaChange(mediaQueryList);

    mediaQueryList.addListener(this.handleMediaChange.bind(this));
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.board);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public waitingTasks = (): Task[] => {
    return this.filterTasksByStatus('waiting');
  }

  public activeTasks = (): Task[] => {
    return this.filterTasksByStatus('active');
  }

  public doneTasks = (): Task[] => {
    return this.filterTasksByStatus('done');
  }

  private filterTasksByStatus = (status: string): Task[] => {
    if (!this.board)
      return [];

    return this.board.tasks.filter(task => task.status === status);
  }

  public openCreateTaskDialog() {
    let dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      data: JSON.parse(JSON.stringify(this.board))
    });

    dialogRef.afterClosed().subscribe((result: Task) => {
      if (result) {
        this.snackBar.open('מוסיף משימה', undefined, {
          direction: 'rtl'
        });

        this._boardService.addNewTask(result).subscribe(() => {
          this.snackBar.open('משימה נוספה בהצלחה', undefined, {
            direction: 'rtl',
            duration: 300
          });

          let newTask = result as Task;
          this.board.tasks.push(newTask);
        }, (err) => {
          this.snackBar.open('התרחשה שגיאה בזמן הוספת המשימה', undefined, {
            direction: 'rtl',
            duration: 300
          });
          console.log(err);
        });
      }
    });
  }

  public openStatistics() {
    let dialogRef = this.dialog.open(StatisticsDialogComponent, {
      data: this.board.tasks
    });
  }

  private chartData(): number[] {
    return [
      this.waitingTasks().length,
      this.activeTasks().length,
      this.doneTasks().length
    ];
  }

  private handleMediaChange(mediaQueryList: MediaQueryList): void {
    if (mediaQueryList.matches) {
      this.columnNum = 3;
      this.chartColspan = 1;
    } else {
      this.columnNum = 2;
      this.chartColspan = 2;
    }
  }

  private onTaskDrop(ev: any, status: string) {
    let task = ev.dragData as Task;
    if (task.status === status)
      return;

    let updateTask = Object.assign({}, task);
    updateTask.status = status;

    this.snackBar.open('מעדכן משימה', undefined, {
      direction: 'rtl'
    });

    this._taskService.updateTask(updateTask).subscribe(() => {
      task.status = updateTask.status;

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

  public onTaskDeleted(taskId: string, status: string): void {
    const taskIndex = this.board.tasks.findIndex(t => t.taskId === taskId);
    this.board.tasks.splice(taskIndex, 1);
    this._boardService.removeTask(this.board.boardId, taskId).subscribe(() => {
      console.log("deleted task");
    }, (err) => {
      console.log(err);
    });
  }

  public assignBoardTasks(): void {
    this.snackBar.open('מחלק מחדש משימות', undefined, { direction: 'rtl' });

    this._boardService.assignBoardTasks(this.board.boardId).subscribe(board => {
      if (board) {
        this.snackBar.open('המשימות חולקו', undefined, { duration: 500, direction: 'rtl' });
        this.board = board;
      }
    }, (err) => {
      this.snackBar.open('התרחשה שגיאה בזמן חלוקת המשימות', undefined, { duration: 500, direction: 'rtl' })
    });
  }
}
