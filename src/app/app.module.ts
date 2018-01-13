// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { HttpModule } from '@angular/http';
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';


// Third Party Modules
import { ChartsModule } from 'ng2-charts';

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

// Services
import { BoardsService } from "./my-boards/boards.service";
import { TasksService } from "./my-tasks/tasks.service";
import { BoardViewResolveService } from "./board-view/board-view-resolve.service";
import { UsersService } from "./services/users.service";

// Routes
import { routing } from "./app.routes";


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
    CreateBoardDialogComponent
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
    MatSnackBarModule
  ],
  providers: [
    BoardsService,
    TasksService,
    BoardViewResolveService,
    UsersService
  ],
  entryComponents: [
    CreateTaskDialogComponent,
    EditTaskDialogComponent,
    DeleteTaskDialogComponent,
    CreateBoardDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
