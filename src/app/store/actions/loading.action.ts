import { Action } from '@ngrx/store';

export enum LoadingTypes {
  SET_LOADING = '[LOADING] SET_LOADING',
}

export class SetLoadingAction implements Action {
  readonly type = LoadingTypes.SET_LOADING;
  constructor(public payload: boolean) {}
}

export type LoadingActionTypes = SetLoadingAction;
