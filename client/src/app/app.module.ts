// modules natifs
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

// modules
import { LayoutModule } from "./shared/modules/layout.module";
import { CoreModule } from "./shared/modules/core.module";

// components
import { AppComponent } from "./app.component";

// routing
import { APP_ROUTES } from "./app.routing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    RouterModule.forRoot(APP_ROUTES),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
