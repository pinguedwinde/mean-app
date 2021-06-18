import { Photo } from "./../models/photo.model";
import { PhotosAction, PhotosActionsType } from "./photos.actions";

export interface PhotosState {
  photos: Photo[];
  filter: string;
}

const initialPhotosState: PhotosState = {
  photos: [],
  filter: "",
};

export function photosReducer(
  state: PhotosState = initialPhotosState,
  action: PhotosAction
): PhotosState {
  switch (action.type) {
    case PhotosActionsType.SET_PHOTOS_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    case PhotosActionsType.TRY_FETCH_PHOTOS:
      return {
        ...state,
      };
    case PhotosActionsType.FETCH_PHOTOS_SUCCESS:
      return {
        ...state,
        photos: action.payload,
        filter: "",
      };
    default:
      return state;
  }
}
