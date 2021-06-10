import { Route } from "@angular/router";
import { SigninComponent } from "./auth/signin/signin.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { HomepageComponent } from "./homepage/homepage.component";

export const APP_ROUTES: Route[] = [
  { path: "", component: HomepageComponent, pathMatch: "full" },
  { path: "home", component: HomepageComponent },
  { path: "register", component: SignupComponent },
  { path: "login", component: SigninComponent },
  { path: "**", redirectTo: "home" },
];
