import { photosFilterSelector } from "./photos.selectors";
import { debounceTime, map, switchMap, take, tap } from "rxjs/operators";
import { FetchPhotosSuccess, PhotosActionsType } from "./photos.actions";
import { Injectable } from "@angular/core";
import { State } from "@mean-app/shared/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { PhotosService } from "../services/photos.service";
import { Photo } from "../models/photo.model";
import { Router } from "@angular/router";

@Injectable()
export class PhotosEffects {
  tryFetchPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PhotosActionsType.TRY_FETCH_PHOTOS),
      debounceTime(1000),
      tap(() => this.router.navigate(["/photos"])),
      switchMap(() => this.store.pipe(select(photosFilterSelector), take(1))),
      switchMap((filter: string) => this.photosService.getPhotos(filter)),
      map((photos: Photo[]) => new FetchPhotosSuccess(photos))
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private photosService: PhotosService,
    private router: Router
  ) {}
}
