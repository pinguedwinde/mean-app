import { UserCredentials } from "@mean-app/shared/models/user-credentials.model";
import { TryRefreshToken } from "./../store/actions/auth.actions";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, Subscription, timer } from "rxjs";
import { tap } from "rxjs/operators";
import { Store } from "@ngrx/store";

import { User } from "../models/user.model";
import { JwtToken } from "../models/jwt-token.model";
import { State } from "../store";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private URL = "/api/auth";
  private subscription!: Subscription;
  public jwtToken$: BehaviorSubject<JwtToken> = new BehaviorSubject<JwtToken>({
    isAuthenticated: null,
    token: null,
  });

  constructor(private http: HttpClient, private store: Store<State>) {
    //this.initToken();
  }

  private initToken(): void {
    const token: string = localStorage.getItem("jwt");
    if (token) {
      this.jwtToken$.next({
        isAuthenticated: true,
        token: token,
      });
    } else {
      this.jwtToken$.next({
        isAuthenticated: false,
        token: null,
      });
    }
  }

  public initRefreshToken(): Observable<number> {
    return timer(2000, 5000).pipe(
      tap(() => this.store.dispatch(new TryRefreshToken()))
    );
  }
  //   switchMap(() => {
  //     if (localStorage.getItem("jwt")) {
  //       console.log("try to refresh token");
  //       return this.http.get<string>(`${this.URL}/token/refresh`).pipe(
  //         tap((token: string) => {
  //           this.jwtToken$.next({
  //             isAuthenticated: true,
  //             token: token,
  //           });
  //           localStorage.setItem("jwt", token);
  //         })
  //       );
  //     } else {
  //       console.log("no token to refresh");
  //       this.subscription.unsubscribe();
  //       return of(null);
  //     }
  //   })
  // )
  // .subscribe(
  //   () => {},
  //   (error) => {
  //     this.jwtToken$.next({
  //       isAuthenticated: false,
  //       token: null,
  //     });
  //     localStorage.removeItem("jwt");
  //     this.subscription.unsubscribe();
  //   }
  // );

  public refreshToken(): Observable<string> {
    return this.http.get<string>(`${this.URL}/token/refresh`);
  }

  public signUp(user: User): Observable<User> {
    return this.http.post<User>(`${this.URL}/register`, user);
  }

  public signIn(credentials: UserCredentials): Observable<string> {
    return this.http.post<string>(`${this.URL}/login`, credentials);
  }
}
