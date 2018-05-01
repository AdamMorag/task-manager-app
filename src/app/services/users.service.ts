import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from '../Objects/User';

@Injectable()
export class UsersService {

  constructor(private _http: Http) { }

  public getAllUsers() {
    return this._http.get("/api/users/all")
      .map(result =>
        result.json());
  }

  public addUser(user: object) {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json');
    return this._http.post("/api/addUser", user, {headers});
  }

  public getUser(uid: string) {
    return this._http.get("/api/users/" + uid)
      .map(user => user.json());
  }

  public updateUser(user: User) {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json');
    return this._http.post("/api/updateUser", user, {headers});
  }
}
