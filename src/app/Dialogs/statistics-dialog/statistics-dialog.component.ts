import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef } from '@angular/material';
import { Task } from "../../Objects/Task";

@Component({
  templateUrl: './statistics-dialog.component.html'
})
export class StatisticsDialogComponent implements OnInit {
  public tasks: any;
  public doughnutChartType: string = 'doughnut';
  public doughnutChartLabels: string[];
  public doughnutChartData: number[];

  constructor(public dialogRef: MatDialogRef<StatisticsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.tasks = data;
    this.doughnutChartData = [
      this.waitingTasks().length,
      this.activeTasks().length,
      this.doneTasks().length
    ]

    this.doughnutChartLabels = ["Waiting", "Active", "Done"];
  }

  ngOnInit() {
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

  private chartData(): number[] {
    return [
      this.waitingTasks().length,
      this.activeTasks().length,
      this.doneTasks().length
    ];
  }

  private filterTasksByStatus = (status: string): Task[] => {
    return this.tasks.filter(task => task.status === status);
  }
}
