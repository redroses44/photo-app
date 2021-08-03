import { Action } from '@ngrx/store';
import { Photo } from 'src/app/interfaces/Photo';

export enum PhotoTypes {
  CREATE_PHOTO = '[PHOTOS] CREATE_PHOTO',
  REMOVE_PHOTO = '[PHOTOS] REMOVE_PHOTO',
  SET_USER_PHOTOS = '[PHOTOS] SET_USER_PHOTOS',
}

interface SetPhotoInterface {
  photos: Photo[];
  userId: string;
}
interface RemovePhotoInterface {
  albumId: string;
  photoId: string;
}

interface CreatePhotoInterface {
  albumId: string;
  photo: Photo;
}

export class CreatePhotoAction implements Action {
  readonly type = PhotoTypes.CREATE_PHOTO;
  constructor(public payload: CreatePhotoInterface) {}
}

export class RemovePhotoAction implements Action {
  readonly type = PhotoTypes.REMOVE_PHOTO;
  constructor(public payload: RemovePhotoInterface) {}
}

export class SetUserAlbumPhoto implements Action {
  readonly type = PhotoTypes.SET_USER_PHOTOS;
  constructor(public payload: SetPhotoInterface) {}
}

export type PhotoActionTypes =
  | CreatePhotoAction
  | RemovePhotoAction
  | SetUserAlbumPhoto;
