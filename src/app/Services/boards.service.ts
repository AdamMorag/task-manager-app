import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Board } from '../Objects/Board';

@Injectable()
export class BoardsService {

  constructor(private _http: Http) { }

  public getBoardsUserIsShareWith(userId: string) {
    return this._http.get("/api/boardsUserIsShareWith/" + userId)
      .map(result =>
        result.json());
  }

  public getBoardsUserIsManagerOf(userId: string) {
    return this._http.get("/api/boardsUserIsManagerOf/" + userId)
      .map(result =>
        result.json());
  }

  public deleteBoard(boardId: string) {
    return this._http.get("/api/board/delete/" + boardId).map(result => {
      console.log(result.json());
      return result.json().n > 0;
    });
  }

  public updateBoard(board: Board) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this._http.post("/api/updateBoard", board, { headers: headers });
  }

  public getBoard(boardId: string) {
    return this._http.get("/api/board/" + boardId)
      .map(board => board.json());
  }

  public saveBoard(board: Board): Observable < any > {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post("/api/board/saveBoard", board, { headers: headers });
  }

  public addNewTask(task: object) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post("/api/addNewTask", task, { headers });
  }

  public removeTask(boardId: string, taskId: string): Observable < any > {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post("/api/removeTask", { boardId, taskId }, { headers });
  }
  
  public assignBoardTasks(boardId: string): Observable < any > {
  return this._http.get('/api/board/assignTasks/' + boardId)
    .map(response => {
      return response.json();
    });
  }
}
