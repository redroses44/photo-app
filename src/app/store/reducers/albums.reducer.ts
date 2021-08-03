import { Album } from 'src/app/interfaces/Album';
import { AlbumActionTypes, AlbumTypes } from '../actions/albums.action';

export type AlbumState = {
  albums: {
    [key: string]: Album[];
  };
  selectedAlbum: Album | null;
};
const initialState: AlbumState = {
  albums: {},
  selectedAlbum: null,
};

export function AlbumsReducer(state = initialState, action: AlbumActionTypes) {
  switch (action.type) {
    case AlbumTypes.CREATE_ALBUM:
      const newAlbums = [
        action.payload.album,
        ...state.albums[action.payload.userId],
      ];
      return {
        ...state,
        albums: {
          [action.payload.userId]: newAlbums,
        },
      };
    case AlbumTypes.SET_USER_ALBUMS:
      return {
        ...state,
        albums: {
          [action.payload.userId]: action.payload.albums,
        },
      };
    case AlbumTypes.REMOVE_ALBUM:
      const updatedUserAlbum = state.albums[action.payload.userId].filter(
        (album) => String(album.id) !== action.payload.albumId
      );
      return {
        ...state,
        albums: { [action.payload.userId]: updatedUserAlbum },
      };
    case AlbumTypes.SET_SELECTED_ALBUM:
      return {
        ...state,
        selectedAlbum: action.payload,
      };
    default:
      return state;
  }
}
