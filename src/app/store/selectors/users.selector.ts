import { createSelector } from '@ngrx/store';
import { AppState } from '../app-state';

export const getUsers = createSelector(
  (state: AppState) => state.user.users,
  (users) => users
);

export const getSelectedUser = (state: AppState) => state.user.selectedUser;

export const getUserById = (userId: number) => (state: AppState) =>
  getUsers(state).find(({ id }) => id === userId);
