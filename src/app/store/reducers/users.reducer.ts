import { User } from 'src/app/interfaces/User';
import { UsersAction, UserTypes } from '../actions/users.action';

export type UserState = {
  users: User[];
  selectedUser: User | null;
};

const initialState: UserState = {
  users: [],
  selectedUser: null,
};

export function UsersReducer(state = initialState, action: UsersAction) {
  switch (action.type) {
    case UserTypes.SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case UserTypes.SET_SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload,
      };
    default:
      return state;
  }
}
