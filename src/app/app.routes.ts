import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyBoardsComponent } from './Components/my-boards/my-boards.component';
import { MyTasksComponent } from './Components/my-tasks/my-tasks.component';
import { BoardViewComponent } from './Components/board-view/board-view.component';
import { BoardViewResolveService } from './Services/board-view-resolve.service';
import { MyScheduleComponent } from './Components/my-schedule/my-schedule.component';
import { MyScheduleResolveService } from './Services/my-schedule-resolve.service';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { MyProfileComponent } from './Components/my-profile/my-profile.component';

export const routes: Routes = [
  { path: 'my-boards', component: MyBoardsComponent },
  { path: 'my-tasks', component: MyTasksComponent },
  {
    path: 'board/:boardId', component: BoardViewComponent, resolve: {
      board: BoardViewResolveService
    }
  },
  { path: 'login-page', component: LoginPageComponent },
  { path: 'my-profile', component: MyProfileComponent },
  {
    path: 'my-schedule', component: MyScheduleComponent, resolve: {
      userEvents: MyScheduleResolveService
    }
  },
  { path: '**', component: MyBoardsComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
