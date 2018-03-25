import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyBoardsComponent } from './my-boards/my-boards.component';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { BoardViewComponent } from './board-view/board-view.component';
import { BoardViewResolveService } from './board-view/board-view-resolve.service';
import { MyScheduleComponent } from './my-schedule/my-schedule.component';
import { MyScheduleResolveService } from './my-schedule/my-schedule-resolve.service';
import { LoginPageComponent } from './login-page/login-page.component';

export const routes: Routes = [
  { path: 'my-boards', component: MyBoardsComponent },
  { path: 'my-tasks', component: MyTasksComponent },
  {
    path: 'board/:boardId', component: BoardViewComponent, resolve: {
      board: BoardViewResolveService
    }
  },
  { path: 'login-page', component: LoginPageComponent },
  {
    path: 'my-schedule', component: MyScheduleComponent, resolve: {
      userEvents: MyScheduleResolveService
    }
  },
  { path: '**', component: MyBoardsComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
