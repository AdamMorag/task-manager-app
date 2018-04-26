import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { UsersService } from '../services/users.service';
import { MatDialogRef } from "@angular/material";
import { IBoard } from "../my-boards/boards.service";

export class User {
  constructor(public name: string, public image: string, public uid?: string) { }
}

@Component({
  selector: 'app-create-board-dialog',
  templateUrl: './create-board-dialog.component.html',
  styleUrls: ['./create-board-dialog.component.css']
})
export class CreateBoardDialogComponent implements OnInit {

  boardName: FormControl = new FormControl("", [
    Validators.required
  ]);

  selectBoardMemebrs: FormControl = new FormControl([], [
  ]);

  startDate: FormControl = new FormControl(new Date(), [
    Validators.required
  ]);

  endDate: FormControl = new FormControl(new Date(), [
    Validators.required
  ]);

  boardMembers = [];

  options = [
  ];

  filteredOptions: Observable<string[]>;

  constructor(private _users: UsersService, public dialogRef: MatDialogRef<CreateBoardDialogComponent>) {
    this._users.getAllUsers().subscribe(users => {
      this.options = users.map(u => new User(u.name, u.image, u.uid));
    });
  }

  ngOnInit() {
    this.filteredOptions = this.selectBoardMemebrs.valueChanges
      .pipe(
      startWith<string | User>(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this.filter(name) : this.options.slice())
      );
  }

  filter(val: any): string[] {
    return this.options.filter(option =>
      option.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  public addMember(event: MatAutocompleteSelectedEvent) {
    this.boardMembers.push(event.option.value);
    const index = this.options.indexOf(event.option.value);
    this.options.splice(index, 1);
    this.selectBoardMemebrs.setValue("");
  }

  public removeMember(member: any) {
    this.options.push(member);
    const index = this.boardMembers.indexOf(member);
    this.boardMembers.splice(index, 1);
  }

  public submitForm(): IBoard {
    return {
      title: this.boardName.value,
      startDate: this.startDate.value,
      endDate: this.endDate.value,
      boardMembers: this.boardMembers,
      tasks: [],
      // Once we have authntication get the real values
      boardOwner: {
        uid: localStorage.getItem("uid"),
        name: localStorage.getItem("name")
      }
    };
  }

  public cancelDialog() {
    this.dialogRef.close();
  }

  public formIsValid(): boolean {
    return this.boardName.hasError('required') ||
      this.startDate.hasError('required') ||
      this.endDate.hasError('required') ||
      this.boardMembers.length === 0
  }

  public displayFn(user?: User): string | undefined {
    return user ? user.name : undefined;
  }

}
