// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { LayoutModule } from '@angular/cdk/layout';

// Angular Material Modules
import {
  MatGridListModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
  MatProgressBarModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatInputModule,
  MatNativeDateModule,
  MatAutocompleteModule,
  MatSnackBarModule,
  MatSelectModule
} from '@angular/material';

// Third Party Modules
import { ChartsModule } from 'ng2-charts';
import { NgDragDropModule } from 'ng-drag-drop';
import { CalendarModule  } from 'angular-calendar'
import { ContextMenuModule } from 'ngx-contextmenu';

// Components
import { AppComponent } from './app.component';
import { MyBoardsComponent } from './my-boards/my-boards.component';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { BoardViewComponent } from './board-view/board-view.component';
import { CreateTaskDialogComponent } from './create-task-dialog/create-task-dialog.component';
import { TaskComponent } from './task/task.component';
import { EditTaskDialogComponent } from './edit-task-dialog/edit-task-dialog.component';
import { DeleteTaskDialogComponent } from './delete-task-dialog/delete-task-dialog.component';
import { CreateBoardDialogComponent } from './create-board-dialog/create-board-dialog.component';
import { MyScheduleComponent } from './my-schedule/my-schedule.component';
import { CreateEventDialogComponent } from './create-event-dialog/create-event-dialog.component';

// Services
import { BoardsService } from "./my-boards/boards.service";
import { TasksService } from "./my-tasks/tasks.service";
import { BoardViewResolveService } from "./board-view/board-view-resolve.service";
import { UsersService } from "./services/users.service";
import { CalendarsService } from './services/calendars.service';
import { MyScheduleResolveService } from './my-schedule/my-schedule-resolve.service';

// Pipes
import { TaskStatusPipe } from './board-view/task-status.pipe';

// Routes
import { routing } from "./app.routes";
import { TaskStatusChartPipe } from './board-view/task-status-chart.pipe';




@NgModule({
  declarations: [
    AppComponent,
    MyBoardsComponent,
    MyTasksComponent,
    BoardViewComponent,
    CreateTaskDialogComponent,
    TaskComponent,
    EditTaskDialogComponent,
    DeleteTaskDialogComponent,
    CreateBoardDialogComponent,
    MyScheduleComponent,
    TaskStatusPipe,
    TaskStatusChartPipe,
    CreateEventDialogComponent  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    HttpModule,
    routing,
    ChartsModule,
    MatDialogModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSelectModule,
    LayoutModule,
    NgDragDropModule.forRoot(),
    CalendarModule.forRoot(),
    ContextMenuModule.forRoot({
      useBootstrap4: true
    })
  ],
  providers: [
    BoardsService,
    TasksService,
    BoardViewResolveService,
    UsersService,
    CalendarsService,
    MyScheduleResolveService
  ],
  entryComponents: [
    CreateTaskDialogComponent,
    EditTaskDialogComponent,
    DeleteTaskDialogComponent,
    CreateBoardDialogComponent,
    CreateEventDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
