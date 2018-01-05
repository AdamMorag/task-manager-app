import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TasksService {

  constructor(private _http: Http) { }

  public getUserTasks(){
    return this._http.get("/api/userTasks")
    .map(result =>         
      result.json());
  }
}
