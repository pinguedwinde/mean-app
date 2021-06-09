// modules natifs
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

// modules
import { LayoutModule } from "./shared/modules/layout.module";

// components
import { AppComponent } from "./app.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { SigninComponent } from "./auth/signin/signin.component";
import { TopbarComponent } from "./shared/components/topbar/topbar.component";

// routing
import { APP_ROUTING } from "./app.routing";

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    SignupComponent,
    SigninComponent,
    TopbarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
