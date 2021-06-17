import { FetchUserSuccess, FetchUserError } from "./../actions/auth.actions";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { of, EMPTY, Subscription } from "rxjs";
import {
  map,
  catchError,
  switchMap,
  tap,
  exhaustMap,
  withLatestFrom,
} from "rxjs/operators";

import { Actions, createEffect, ofType } from "@ngrx/effects";

import { AuthService } from "@mean-app/shared/services/auth.service";
import { TryRefreshToken } from "@mean-app/shared/store/actions/auth.actions";
import { User } from "@mean-app/shared/models/user.model";
import { UserCredentials } from "@mean-app/shared/models/user-credentials.model";
import { JwtToken } from "@mean-app/shared/models/jwt-token.model";
import {
  AuthActionsType,
  SigninError,
  SigninSuccess,
  SignupError,
  TrySignin,
  TrySignup,
} from "@mean-app/shared/store/actions/auth.actions";
import { select, Store } from "@ngrx/store";
import { State } from "..";
import { tokenSelector } from "../selectors/auth.selectors";
import { UserService } from "@mean-app/shared/services/user.service";

@Injectable()
export class AuthEffects {
  private subscription: Subscription;

  trySignup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionsType.TRY_SIGNUP),
      map((action: TrySignup) => action.payload),
      switchMap((user: User) => {
        return this.authService.signUp(user);
      }),
      switchMap((user: User) => {
        this.router.navigate(["/signin"]);
        return EMPTY;
      }),
      catchError((error: any) => of(new SignupError(error.statusText)))
    )
  );

  trySignin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionsType.TRY_SIGNIN),
      map((action: TrySignin) => action.payload),
      exhaustMap((userCredentials: UserCredentials) =>
        this.authService.signIn(userCredentials).pipe(
          map(
            (token: string) =>
              new SigninSuccess({ isAuthenticated: true, token: token })
          ),
          catchError((error: any) => {
            return of(new SigninError(error.statusText));
          })
        )
      )
    )
  );

  signinSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionsType.SIGNIN_SUCCESS),
        map((action: SigninSuccess) => action.payload),
        tap((token: JwtToken) => {
          localStorage.setItem("jwt", token.token);
          if (!this.subscription) {
            this.subscription = this.authService.initRefreshToken().subscribe();
            this.router.navigate(["/"]);
          }
        })
      ),
    { dispatch: false }
  );

  tryRefreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionsType.TRY_REFRESH_TOKEN),
      withLatestFrom(this.store.pipe(select(tokenSelector))),
      switchMap(([action, token]) => {
        if (token) {
          return this.authService.refreshToken().pipe(
            map((newToken) => {
              console.log("Token refreshed");

              return new SigninSuccess({
                isAuthenticated: true,
                token: newToken,
              });
            }),
            catchError(() => {
              if (this.subscription) {
                this.subscription.unsubscribe();
              }
              localStorage.removeItem("jwt");
              return EMPTY;
            })
          );
        } else {
          console.log("No token to refresh");
          if (this.subscription) {
            this.subscription.unsubscribe();
          }
          return EMPTY;
        }
      })
    )
  );

  tryFetchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionsType.TRY_FETCH_USER),
      switchMap(() => {
        return this.userService.getCurrentUser().pipe(
          map((user: User) => new FetchUserSuccess(user)),
          catchError((error: any) => of(new FetchUserError(error.statusText)))
        );
      })
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionsType.LOGOUT),
        tap(() => {
          localStorage.removeItem("jwt");
          if (this.subscription) {
            this.subscription.unsubscribe();
            this.router.navigate(["/"]);
            console.log("Logged out");
          }
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private store: Store<State>
  ) {}
}
