import { JwtToken } from "./../../models/jwt-token.model";
import { UserCredentials } from "@mean-app/shared/models/user-credentials.model";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { of, EMPTY, Subscription } from "rxjs";
import { map, catchError, switchMap, tap, exhaustMap } from "rxjs/operators";

import { Actions, createEffect, ofType } from "@ngrx/effects";

import { AuthService } from "@mean-app/shared/services/auth.service";
import { User } from "@mean-app/shared/models/user.model";
import {
  AuthActionsType,
  SigninError,
  SigninSuccess,
  SignupError,
  TrySignin,
  TrySignup,
} from "@mean-app/shared/store/actions/auth.actions";

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
      switchMap(() =>
        this.authService.refreshToken().pipe(
          map((token: string) => {
            console.log("Token refreshed");
            return new SigninSuccess({ isAuthenticated: true, token: token });
          }),
          catchError(() => {
            if (this.subscription) {
              this.subscription.unsubscribe();
            }
            localStorage.removeItem("jwt");
            return EMPTY;
          })
        )
      )
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
    private router: Router
  ) {}
}
