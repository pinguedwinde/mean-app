import { Photo } from "./../models/photo.model";
export enum PhotosActionsType {
  SET_PHOTOS_FILTER = "[PHOTOS] set photos filter",
  TRY_FETCH_PHOTOS = "[PHOTOS] try fetch photos",
  FETCH_PHOTOS_SUCCESS = "[PHOTOS] fetch photos",
}

export class SetPhotosFilter {
  readonly type = PhotosActionsType.SET_PHOTOS_FILTER;
  constructor(public payload: string) {}
}
export class TryFetchPhotos {
  readonly type = PhotosActionsType.TRY_FETCH_PHOTOS;
}
export class FetchPhotosSuccess {
  readonly type = PhotosActionsType.FETCH_PHOTOS_SUCCESS;
  constructor(public payload: Photo[]) {}
}

export type PhotosAction =
  | SetPhotosFilter
  | TryFetchPhotos
  | FetchPhotosSuccess;
