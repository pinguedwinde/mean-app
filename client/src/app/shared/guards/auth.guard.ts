import { jwtTokenSelector } from "./../store/selectors/auth.selectors";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { select, Store } from "@ngrx/store";

import { State } from "@mean-app/shared/store";
import { JwtToken } from "@mean-app/shared/models/jwt-token.model";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<State>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.pipe(
      select(jwtTokenSelector),
      map((jwtToken: JwtToken) => jwtToken.isAuthenticated),
      take(1)
    );
  }
}
