import { AppState } from '../app-state';

export const getUserPhotos = (id: string) => (state: AppState) =>
  state.photos[id];
