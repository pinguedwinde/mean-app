import { environment } from "./../environments/environment";
import { REDUCERS_MAP } from "./shared/store/index";

// modules natifs
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

// modules
import { CoreModule } from "./shared/modules/core.module";

// effects
import { AuthEffects } from "./shared/store/effects/auth.effects";

// components
import { AppComponent } from "./app.component";

// routing
import { APP_ROUTES } from "./app.routing";
import { authReducer } from "./shared/store/reducers/auth.reducer";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    RouterModule.forRoot(APP_ROUTES),
    StoreModule.forRoot({}),
    StoreModule.forFeature("auth", authReducer),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({
      name: "NGRX_PHOTOS",
      logOnly: environment.production,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
