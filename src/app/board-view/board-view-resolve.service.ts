import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';

import { BoardsService } from "../my-boards/boards.service";

@Injectable()
export class BoardViewResolveService implements Resolve<any> {

  constructor(private _boardsService: BoardsService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Promise<any> | boolean {
    const id = route.params['boardId'];

    return new Promise((resolve, reject) => {
      this._boardsService.getBoard(id).subscribe(board => {
        if (board) {
          resolve(board);
        } else {
          this.router.navigate(['/']);
          return false;
        }              
      });
    });
  }

}
