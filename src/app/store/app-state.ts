import { Album } from '../interfaces/Album';
import { Photo } from '../interfaces/Photo';
import { UserInteraction } from '../interfaces/UserInteraction';
import { AlbumState } from './reducers/albums.reducer';
import { UserState } from './reducers/users.reducer';

export interface AppState {
  readonly user: UserState;
  readonly userInteractions: UserInteraction[];
  readonly album: AlbumState;
  readonly photos: { [key: string]: Photo[] };
  readonly loading: boolean;
}
