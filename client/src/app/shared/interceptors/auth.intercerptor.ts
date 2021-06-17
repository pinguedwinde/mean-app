import { tokenSelector } from "@mean-app/shared/store/selectors/auth.selectors";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { State } from "../store";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private token: string;
  constructor(private store: Store<State>) {
    this.store
      .pipe(select(tokenSelector))
      .subscribe((token: string) => (this.token = token));
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.token) {
      const userServiceRequest = req.clone({
        headers: req.headers.set("authorization", this.token),
      });
      return next.handle(userServiceRequest);
    } else {
      return next.handle(req);
    }
  }
}
