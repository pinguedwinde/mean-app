import { Observable } from "rxjs";
import { User } from "@mean-app/shared/models/user.model";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { switchMap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UserService {
  public user$: BehaviorSubject<User> = new BehaviorSubject({
    name: "",
  });

  constructor(private http: HttpClient) {}

  public getCurrentUser(): Observable<User> {
    if (this.user$.value !== null && this.user$.value.name !== "") {
      return this.user$;
    } else {
      return this.http.get<User>("api/user/current").pipe(
        switchMap((user: User) => {
          this.user$.next(user);
          return this.user$;
        })
      );
    }
  }
}
