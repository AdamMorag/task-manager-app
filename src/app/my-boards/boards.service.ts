import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

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

  public getBoard(boardId: number) {
    return this._http.get("/api/board/" + boardId)
      .map(board => board.json());
  }

}
