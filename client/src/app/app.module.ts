// modules natifs
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

// modules
import { LayoutModule } from "./shared/modules/layout.module";

// components
import { AppComponent } from "./app.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { SigninComponent } from "./auth/signin/signin.component";
import { TopbarComponent } from "./shared/components/topbar/topbar.component";
import { ProfileComponent } from "./profile/profile.component";

// services
import { AuthService } from "./shared/services/auth.service";

//guards
import { AuthGuard } from "./shared/guards/auth.guard";

// routing
import { APP_ROUTES } from "./app.routing";

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    SignupComponent,
    SigninComponent,
    TopbarComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    ReactiveFormsModule,
    RouterModule.forRoot(APP_ROUTES),
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
