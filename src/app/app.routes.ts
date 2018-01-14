import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyBoardsComponent } from "./my-boards/my-boards.component";
import { MyTasksComponent } from "./my-tasks/my-tasks.component";
import { BoardViewComponent } from "./board-view/board-view.component";
import { BoardViewResolveService } from "./board-view/board-view-resolve.service";
import { MyScheduleComponent } from "./my-schedule/my-schedule.component";

export const routes: Routes = [
  { path: 'my-boards', component: MyBoardsComponent },
  { path: 'my-tasks', component: MyTasksComponent },
  {
    path: 'board/:boardId', component: BoardViewComponent, resolve: {
      board: BoardViewResolveService
    }
  },
  { path: 'my-schedule', component: MyScheduleComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);