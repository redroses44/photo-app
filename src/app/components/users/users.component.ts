import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { User } from 'src/app/interfaces/User';
import { SetLoadingAction } from 'src/app/store/actions/loading.action';
import {
  SetSelectedUser,
  SetUsersAction,
} from 'src/app/store/actions/users.action';
import { AppState } from 'src/app/store/app-state';
import { getUsers } from 'src/app/store/selectors/users.selector';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserService,
    private store: Store<AppState>
  ) {
    store.pipe(select(getUsers)).subscribe((state) => (this.users = state));
  }

  setUser(user: User) {
    this.store.dispatch(new SetSelectedUser(user));
  }

  ngOnInit(): void {
    if (!this.users.length) {
      this.store.dispatch(new SetLoadingAction(true));
      this.userService.getUsers().subscribe((users) => {
        this.store.dispatch(new SetUsersAction(users));
        this.store.dispatch(new SetLoadingAction(false));
      });
    }
  }
}
