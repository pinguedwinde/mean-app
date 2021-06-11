import { Router } from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { JwtToken } from "./../../models/jwt-token.model";
import { AuthService } from "@mean-app/shared/services/auth.service";

@Component({
  selector: "app-topbar",
  templateUrl: "./topbar.component.html",
  styleUrls: ["./topbar.component.css"],
})
export class TopbarComponent implements OnInit, OnDestroy {
  public jwtToken!: JwtToken;
  private subscription!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.subscription = this.authService.jwtToken$.subscribe(
      (jwtToken: JwtToken) => (this.jwtToken = jwtToken)
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  public logout(): void {
    this.authService.jwtToken$.next({
      isAuthenticated: false,
      token: null,
    });
    localStorage.removeItem("jwt");
    this.router.navigate(["/login"]);
  }
}
