import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Components
import { SigninComponent } from "@mean-app/components/auth/signin/signin.component";
import { SignupComponent } from "@mean-app/components/auth/signup/signup.component";
import { HomepageComponent } from "@mean-app/components/homepage/homepage.component";
import { TopbarComponent } from "../components/topbar/topbar.component";

//guards and interceptors
import { AuthGuard } from "../guards/auth.guard";
import { AuthInterceptor } from "../interceptors/auth.intercerptor";

//services
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { LayoutModule } from "./layout.module";

const COMPONENTS = [
  HomepageComponent,
  SignupComponent,
  SigninComponent,
  TopbarComponent,
];

@NgModule({
  declarations: COMPONENTS,
  exports: COMPONENTS,
  imports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    LayoutModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
