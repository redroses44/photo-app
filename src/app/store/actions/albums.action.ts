import { Action } from '@ngrx/store';
import { Album } from 'src/app/interfaces/Album';

export enum AlbumTypes {
  CREATE_ALBUM = '[ALBUMS] CREATE_ALBUM',
  REMOVE_ALBUM = '[ALBUMS] REMOVE_ALBUM',
  SET_USER_ALBUMS = '[ALBUMS] SET_USER_ALBUMS',
  SET_SELECTED_ALBUM = '[ALBUMS] SET_SELECTED_ALBUM',
}

interface SetAlbumInterace {
  albums: Album[];
  userId: string;
}
interface RemoveAlbumInterface {
  userId: string;
  albumId: string;
}

interface CreateAlbumInterface {
  userId: string;
  album: Album;
}

export class CreateAlbumAction implements Action {
  readonly type = AlbumTypes.CREATE_ALBUM;
  constructor(public payload: CreateAlbumInterface) {}
}

export class RemoveAlbumAction implements Action {
  readonly type = AlbumTypes.REMOVE_ALBUM;
  constructor(public payload: RemoveAlbumInterface) {}
}

export class SetUserAlbumsAction implements Action {
  readonly type = AlbumTypes.SET_USER_ALBUMS;
  constructor(public payload: SetAlbumInterace) {}
}

export class SetSelectedAlbum implements Action {
  readonly type = AlbumTypes.SET_SELECTED_ALBUM;
  constructor(public payload: Album) {}
}

export type AlbumActionTypes =
  | CreateAlbumAction
  | RemoveAlbumAction
  | SetUserAlbumsAction
  | SetSelectedAlbum;
