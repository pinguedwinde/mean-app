import { PhotosState } from "./photos.reducers";
import { PhotosAction } from "./photos.actions";
import { createSelector } from "@ngrx/store";
import { createFeatureSelector } from "@ngrx/store";

export const photosFeatureSelector = createFeatureSelector("photos");

export const photosFilterSelector = createSelector(
  photosFeatureSelector,
  (photosState: PhotosState) => photosState.filter
);
export const photosSelector = createSelector(
  photosFeatureSelector,
  (photosState: PhotosState) => photosState.photos
);
