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
    return this.http.get<User>("api/user/current");
  }
}
