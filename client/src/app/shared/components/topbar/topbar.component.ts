import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { JwtToken } from "@mean-app/shared/models/jwt-token.model";
import { select, Store } from "@ngrx/store";
import { State } from "@mean-app/shared/store";
import { jwtTokenSelector } from "@mean-app/shared/store/selectors/auth.selectors";
import { map } from "rxjs/operators";
import { Logout } from "@mean-app/shared/store/actions/auth.actions";
import {
  SetPhotosFilter,
  TryFetchPhotos,
} from "@mean-app/photos/shared/store/photos.actions";

@Component({
  selector: "app-topbar",
  templateUrl: "./topbar.component.html",
  styleUrls: ["./topbar.component.css"],
})
export class TopbarComponent implements OnInit {
  public isAuthenticated$: Observable<boolean>;
  public search: string;
  public isPhotosRoute$: Observable<boolean>;

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

  public applyFilterSearch(): void {
    this.store.dispatch(new SetPhotosFilter(this.search));
    this.store.dispatch(new TryFetchPhotos());
  }
}
