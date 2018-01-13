import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BoardsService {

  constructor(private _http: Http) { }

  public getBoardsUserIsShareWith() {
    return this._http.get("/api/boardsUserIsShareWith")
      .map(result =>
        result.json());
  }

  public getBoardsUserIsManagerOf() {
    return this._http.get("/api/boardsUserIsManagerOf")
      .map(result =>
        result.json());
  }

  public getBoard(boardId: string) {
    return this._http.get("/api/board/" + boardId)
      .map(board => board.json());
  }

  public saveBoard(board: any): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post("/api/board/saveBoard", board, { headers: headers });
  }

  public addNewTask(task: object) {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json');
    return this._http.post("/api/addNewTask", task, {headers}).subscribe(result => {
    })
  }
}
