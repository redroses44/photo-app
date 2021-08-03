import { LoadingActionTypes, LoadingTypes } from '../actions/loading.action';

const initialState = false;

export function LoadingReducer(
  state = initialState,
  action: LoadingActionTypes
) {
  switch (action.type) {
    case LoadingTypes.SET_LOADING:
      return action.payload;
    default:
      return state;
  }
}
