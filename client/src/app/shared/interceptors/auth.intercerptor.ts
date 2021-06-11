import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";

export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("jwt");
    if (token) {
      const userServiceRequest = req.clone({
        headers: req.headers.set("authorization", token),
      });
      return next.handle(userServiceRequest);
    } else {
      return next.handle(req);
    }
  }
}
