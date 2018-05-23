// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { LayoutModule } from '@angular/cdk/layout';
import { Angular2SocialLoginModule } from 'angular2-social-login';
import {
  NgbModalModule,
  NgbDatepickerModule,
  NgbTimepickerModule
} from '@ng-bootstrap/ng-bootstrap';

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
import { MyBoardsComponent } from './Components/my-boards/my-boards.component';
import { MyTasksComponent } from './Components/my-tasks/my-tasks.component';
import { BoardViewComponent } from './Components/board-view/board-view.component';
import { CreateTaskDialogComponent } from './Dialogs/create-task-dialog/create-task-dialog.component';
import { StatisticsDialogComponent } from './Dialogs/statistics-dialog/statistics-dialog.component';
import { TaskComponent } from './Components/task/task.component';
import { EditTaskDialogComponent } from './Dialogs/edit-task-dialog/edit-task-dialog.component';
import { DeleteTaskDialogComponent } from './Dialogs/delete-task-dialog/delete-task-dialog.component';
import { CreateBoardDialogComponent } from './Dialogs/create-board-dialog/create-board-dialog.component';
import { MyScheduleComponent } from './Components/my-schedule/my-schedule.component';
import { CreateEventDialogComponent } from './Dialogs/create-event-dialog/create-event-dialog.component';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { MyProfileComponent } from './Components/my-profile/my-profile.component';
import { EditEventDialogComponent } from './Dialogs/edit-event-dialog/edit-event-dialog.component';
import { DeleteEventDialogComponent } from './Dialogs/delete-event-dialog/delete-event-dialog.component';
import { DatetimePickerComponent } from './Others/datetime-picker/datetime-picker.component';
import { DeleteBoardDialogComponent } from './Dialogs/delete-board-dialog/delete-board-dialog.component';
import { EditBoardDialogComponent } from './Dialogs/edit-board-dialog/edit-board-dialog.component';

// Services
import { BoardsService } from "./Services/boards.service";
import { TasksService } from "./Services/tasks.service";
import { BoardViewResolveService } from "./Services/board-view-resolve.service";
import { UsersService } from "./Services/users.service";
import { CalendarsService } from './Services/calendars.service';
import { MyScheduleResolveService } from './Services/my-schedule-resolve.service';

// Pipes
import { TaskStatusPipe } from './Components/board-view/task-status.pipe';
import { TaskStatusChartPipe } from './Components/board-view/task-status-chart.pipe';

// Routes
import { routing } from "./app.routes";

const providers = {
  'google': {
    "clientId": "904864276720-q769p3h58j1ds3q9gadrma4je170iagm.apps.googleusercontent.com"
  }
};


@NgModule({
  declarations: [
    AppComponent,
    MyBoardsComponent,
    MyTasksComponent,
    BoardViewComponent,
    CreateTaskDialogComponent,
    StatisticsDialogComponent,
    TaskComponent,
    EditTaskDialogComponent,
    DeleteTaskDialogComponent,
    CreateBoardDialogComponent,
    MyScheduleComponent,
    LoginPageComponent,
    TaskStatusPipe,
    TaskStatusChartPipe,
    CreateEventDialogComponent,
    EditEventDialogComponent,
    DeleteEventDialogComponent,
    DatetimePickerComponent,
    MyProfileComponent,
    DeleteBoardDialogComponent,
    EditBoardDialogComponent
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
    Angular2SocialLoginModule,
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
    NgbDatepickerModule.forRoot(),
    NgbTimepickerModule.forRoot(),
    NgDragDropModule.forRoot(),
    NgbModalModule.forRoot(),
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
    StatisticsDialogComponent,
    EditTaskDialogComponent,
    DeleteTaskDialogComponent,
    CreateBoardDialogComponent,
    CreateEventDialogComponent,
    EditEventDialogComponent,
    DeleteEventDialogComponent,
    EditBoardDialogComponent,
    DeleteBoardDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

Angular2SocialLoginModule.loadProvidersScripts(providers);
