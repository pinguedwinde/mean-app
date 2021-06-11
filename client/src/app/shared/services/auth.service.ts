import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of, Subscription, timer } from "rxjs";
import { tap, switchMap } from "rxjs/operators";

import { User } from "../models/user.model";
import { JwtToken } from "../models/jwt-token.model";

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

  constructor(private http: HttpClient) {
    this.initToken();
    this.subscription = this.initTimer();
  }

  private initToken(): void {
    const token: string | null = localStorage.getItem("jwt");
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

  private initTimer(): Subscription {
    return timer(2000, 5000)
      .pipe(
        switchMap(() => {
          if (localStorage.getItem("jwt")) {
            console.log("try to refresh token");
            return this.http.get<string>(`${this.URL}/token/refresh`).pipe(
              tap((token: string) => {
                this.jwtToken$.next({
                  isAuthenticated: true,
                  token: token,
                });
                localStorage.setItem("jwt", token);
              })
            );
          } else {
            console.log("no token to refresh");
            this.subscription.unsubscribe();
            return of(null);
          }
        })
      )
      .subscribe(
        () => {},
        (error) => {
          this.jwtToken$.next({
            isAuthenticated: false,
            token: null,
          });
          localStorage.removeItem("jwt");
          this.subscription.unsubscribe();
        }
      );
  }

  public signUp(user: User): Observable<User> {
    return this.http.post<User>(`${this.URL}/register`, user);
  }

  public signIn(credentials: {
    email: string;
    password: string;
  }): Observable<string> {
    return this.http.post<string>(`${this.URL}/login`, credentials).pipe(
      tap((token: string) => {
        this.jwtToken$.next({
          isAuthenticated: true,
          token: token,
        });
        localStorage.setItem("jwt", token);
        this.subscription = this.initTimer();
      })
    );
  }
}
