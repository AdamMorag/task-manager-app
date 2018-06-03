import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Board } from '../../Objects/Board';
import { User } from '../../Objects/User';
import { UsersService } from '../../Services/users.service';
import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';

@Component({
  selector: 'app-edit-board-dialog',
  templateUrl: './edit-board-dialog.component.html',
  styleUrls: ['./edit-board-dialog.component.css']
})
export class EditBoardDialogComponent implements OnInit {
  private boardToUpdate: Board;

  boardName: FormControl;
  selectBoardMemebrs: FormControl;

  startDate: FormControl;

  endDate: FormControl;

  categoryId: FormControl;

  boardMembers = [];

  options = [
  ];

  filteredOptions: Observable<string[]>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Board,
              private _usersService: UsersService,
              public dialogRef: MatDialogRef<EditBoardDialogComponent>)
  {
    this.boardToUpdate = data;
    this.boardName  = new FormControl(this.boardToUpdate.title, [
      Validators.required
    ]);

    this.selectBoardMemebrs = new FormControl(this.boardToUpdate.boardMembers, [
    ]);

    this.categoryId = new FormControl(this.boardToUpdate.categoryId, [
      Validators.required
    ]);

    this.boardMembers = this.boardToUpdate.boardMembers;

    this._usersService.getAllUsers().subscribe(users => {
      this.options = users.map(u => new User(u.name, u.image,u.color, u.uid));
      const self = this;

      this.options = this.options.filter((x: User) => {
        return self.boardMembers.find(m => m.uid == x.uid) === undefined;
      });
    });

    this.startDate = new FormControl(this.boardToUpdate.startDate, [
      Validators.required
    ]);

    this.endDate = new FormControl(this.boardToUpdate.endDate, [
      Validators.required
    ]);
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

  public formIsValid(): boolean {
    return this.boardName.hasError('required') ||
      this.startDate.hasError('required') ||
      this.endDate.hasError('required') ||
      this.categoryId.hasError('required') ||
      this.boardMembers.length === 0
  }

  public submitForm(): Board {
    this.boardToUpdate.title = this.boardName.value;
    this.boardToUpdate.startDate = this.startDate.value;
    this.boardToUpdate.endDate = this.endDate.value;
    this.boardToUpdate.boardMembers = this.boardMembers;
    this.boardToUpdate.categoryId = this.categoryId.value;

    return this.boardToUpdate;
  }

  public cancelDialog() {
    this.dialogRef.close();
  }

  public displayFn(user?: User): string | undefined {
    return user ? user.name : undefined;
  }
}
