import { Router } from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";

import { JwtToken } from "./../../models/jwt-token.model";
import { AuthService } from "@mean-app/shared/services/auth.service";
import { select, Store } from "@ngrx/store";
import { State } from "@mean-app/shared/store";
import { jwtTokenSelector } from "@mean-app/shared/store/selectors/auth.selectors";
import { map } from "rxjs/operators";
import { Logout } from "@mean-app/shared/store/actions/auth.actions";

@Component({
  selector: "app-topbar",
  templateUrl: "./topbar.component.html",
  styleUrls: ["./topbar.component.css"],
})
export class TopbarComponent implements OnInit {
  public isAuthenticated$: Observable<boolean>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.isAuthenticated$ = this.store.pipe(
      select(jwtTokenSelector),
      map((jwtToken: JwtToken) => {
        if (jwtToken) {
          return jwtToken.isAuthenticated;
        } else {
          return false;
        }
      })
    );
  }

  public logout(): void {
    this.store.dispatch(new Logout());
  }
}
