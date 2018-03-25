import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { ITask } from '../task/task.component';

@Injectable()
export class TasksService {

  constructor(private _http: Http) { }

  public getUserTasks(userId: string) {
    return this._http.get("/api/userTasks/" + userId)
      .map(result =>
        result.json());
  }

  public updateTask(task: ITask) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this._http.post("/api/updateTask", task, { headers: headers });
  }
}
