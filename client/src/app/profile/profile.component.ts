import { TryFetchUser } from "./../shared/store/actions/auth.actions";
import { User } from "@mean-app/shared/models/user.model";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";
import { State } from "@mean-app/shared/store";
import { userSelector } from "@mean-app/shared/store/selectors/auth.selectors";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  public user$!: Observable<User>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.user$ = this.store.pipe(select(userSelector));
    this.store.dispatch(new TryFetchUser());
  }
}
