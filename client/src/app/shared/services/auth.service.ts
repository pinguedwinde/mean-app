import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { User } from "../models/user.model";
import { JwtToken } from "../models/jwt-token.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private URL = "/api/auth";
  public jwtToken$: BehaviorSubject<JwtToken> = new BehaviorSubject<JwtToken>({
    isAuthenticated: null,
    token: null,
  });

  constructor(private http: HttpClient) {
    this.initToken();
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
      })
    );
  }
}
