import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  constructor(private _http: Http) { }

  public getAllUsers() {
    return this._http.get("/api/users/all")
      .map(result =>
        result.json());
  }
}
