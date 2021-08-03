import { Action } from '@ngrx/store';
import { Album } from 'src/app/interfaces/Album';
import { Photo } from 'src/app/interfaces/Photo';

export type InteractionType =
  | 'IMAGE_CREATED'
  | 'IMAGE_REMOVED'
  | 'ALBUM_CREATED'
  | 'ALBUM_REMOVED';

interface InteractionPayload {
  type: InteractionType;
  resource?: Photo | Album;
  userId: string;
}

export enum InteractionTypes {
  ADD_INTERACTION = '[INTERACTIONS] ADD_INTERACTION',
  REMOVE_INTERACTIONS = '[INTERACTIONS] REMOVE_INTERACTIONS',
}

export class AddInteractionAction implements Action {
  readonly type = InteractionTypes.ADD_INTERACTION;
  constructor(public payload: InteractionPayload) {}
}

export class ClearInteractionAction implements Action {
  readonly type = InteractionTypes.REMOVE_INTERACTIONS;
  constructor() {}
}

export type InteractionActions = AddInteractionAction | ClearInteractionAction;
