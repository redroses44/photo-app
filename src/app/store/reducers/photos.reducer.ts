import { Photo } from 'src/app/interfaces/Photo';
import { PhotoActionTypes, PhotoTypes } from '../actions/photos.action';

interface UserPhotos {
  [key: string]: Photo[];
}
const initialState: UserPhotos = {};

export function PhotoReducer(state = initialState, action: PhotoActionTypes) {
  switch (action.type) {
    case PhotoTypes.CREATE_PHOTO:
      const newPhotos = [
        action.payload.photo,
        ...state[action.payload.albumId],
      ];
      return {
        ...state,
        [action.payload.albumId]: newPhotos,
      };
    case PhotoTypes.SET_USER_PHOTOS:
      return {
        ...state,
        [action.payload.userId]: action.payload.photos,
      };
    case PhotoTypes.REMOVE_PHOTO:
      const updatedUserPhotos = state[action.payload.albumId].filter(
        (album) => String(album.id) !== action.payload.photoId
      );
      return {
        ...state,
        [action.payload.albumId]: updatedUserPhotos,
      };
    default:
      return state;
  }
}
