import { AppState } from '../app-state';

export const getUserAlbums = (id: string) => (state: AppState) =>
  state.album.albums[id];

export const getSelectedAlbum = (state: AppState) => state.album.selectedAlbum;
