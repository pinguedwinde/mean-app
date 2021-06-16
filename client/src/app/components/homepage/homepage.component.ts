import { OnDestroy } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { JwtToken } from "@mean-app/shared/models/jwt-token.model";
import { AuthService } from "@mean-app/shared/services/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"],
})
export class HomepageComponent implements OnInit, OnDestroy {
  public jwtToken!: JwtToken;
  private subscription!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.subscription = this.authService.jwtToken$.subscribe(
      (jwtToken: JwtToken) => (this.jwtToken = jwtToken)
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
