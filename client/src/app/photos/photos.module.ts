import { EffectsModule } from "@ngrx/effects";
import { PhotosService } from "./shared/services/photos.service";
import { PHOTOS_ROUTES } from "./photos.routing";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PhotosComponent } from "./photos/photos.component";
import { LayoutModule } from "@mean-app/shared/modules/layout.module";
import { StoreModule } from "@ngrx/store";
import { photosReducer } from "./shared/store/photos.reducers";
import { PhotosEffects } from "./shared/store/photos.effects";

@NgModule({
  declarations: [PhotosComponent],
  imports: [
    LayoutModule,
    RouterModule.forChild(PHOTOS_ROUTES),
    StoreModule.forFeature("photos", photosReducer),
    EffectsModule.forFeature([PhotosEffects]),
  ],
  providers: [PhotosService],
})
export class PhotosModule {}
