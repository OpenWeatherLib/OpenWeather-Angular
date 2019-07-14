import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    intercept = (httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => next.handle(httpRequest);
}
