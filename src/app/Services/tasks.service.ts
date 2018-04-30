import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Task } from '../Objects/Task';

@Injectable()
export class TasksService {

  constructor(private _http: Http) { }

  public getUserTasks(userId: string) {
    return this._http.get("/api/userTasks/" + userId)
      .map(result =>
        result.json());
  }

  public updateTask(task: Task) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this._http.post("/api/updateTask", task, { headers: headers });
  }
}
