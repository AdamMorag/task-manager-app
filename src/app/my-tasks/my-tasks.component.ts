import { Component, OnInit } from '@angular/core';
import { TasksService } from "./tasks.service";
import { ITask } from "../task/task.component";

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent implements OnInit {

  public myTasks: ITask[];
  public loadingMyTasks = true;

  constructor(private _tasksService: TasksService) {
    _tasksService.getUserTasks(localStorage.getItem("uid"))
      .subscribe(userTasks => {
        this.myTasks = userTasks
        this.loadingMyTasks= false;
      });
  }

  ngOnInit() {
  }

  public onTaskDeleted(taskId: string): void {
    const taskIndex = this.myTasks.findIndex(t => t.taskId === taskId);
    this.myTasks.splice(taskIndex, 1);
  }
}
