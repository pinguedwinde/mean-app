import { AuthGuard } from "./shared/guards/auth.guard";
import { ProfileComponent } from "./profile/profile.component";
import { Route } from "@angular/router";
import { SigninComponent } from "./components/auth/signin/signin.component";
import { SignupComponent } from "./components/auth/signup/signup.component";
import { HomepageComponent } from "./components/homepage/homepage.component";

export const APP_ROUTES: Route[] = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomepageComponent },
  { path: "register", component: SignupComponent },
  { path: "login", component: SigninComponent },
  {
    path: "account",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("app/profile/profile.module").then((m) => m.ProfileModule),
  },
  { path: "**", redirectTo: "home" },
];
