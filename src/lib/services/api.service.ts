import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { environment } from "@environments/environment";
import { validate, required } from "@lib/decorator";
import { ValidationRequiredType } from "@lib/enums";

@Injectable()
export class ApiService {

  constructor(private readonly http: HttpClient) { }

  @validate(of(undefined))
  get<T>(@required(ValidationRequiredType.String) url: string, useProxyService: boolean = false): Observable<T> {
    return this.http
      .get(useProxyService ? (environment.urls.crossOrigin.allOrigins + url) : url)
      .pipe(
        map((response: any) => {
          let value: T;

          if (!!response) {
            if (useProxyService && response.hasOwnProperty("contents")) {
              value = JSON.parse(response["contents"].toString());
            } else {
              value = response as T;
            }
          }

          if (value.hasOwnProperty("cod") && (value["cod"] !== 200 && value["cod"] !== "200") && value.hasOwnProperty("message")) {
            console.warn(value["message"]);
            return undefined;
          }

          return value;
        }),
        catchError((error: any) => { console.error(error); return of(undefined); }));
  }
}
