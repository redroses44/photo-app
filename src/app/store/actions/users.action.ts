import { Action } from '@ngrx/store';
import { User } from 'src/app/interfaces/User';

export enum UserTypes {
  SET_USERS = '[USERS] SET_USERS',
  SET_SELECTED_USER = '[USERS] SET_SELECTED_USER',
}

export class SetUsersAction implements Action {
  readonly type = UserTypes.SET_USERS;
  constructor(public payload: User[]) {}
}

export class SetSelectedUser implements Action {
  readonly type = UserTypes.SET_SELECTED_USER;
  constructor(public payload: User) {}
}

export type UsersAction = SetUsersAction | SetSelectedUser;
