import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import "@lib/extensions/string.extensions";

import { validate, required } from "@lib/decorator";
import { ValidationRequiredType } from "@lib/enums";

@Injectable()
export class ApiService {

  // https://medium.freecodecamp.org/client-side-web-scraping-with-javascript-using-jquery-and-regex-5b57a271cb86
  private allOriginsUrl: string = "http://allorigins.me/get?url=";
  private anyOriginUrl: string = "http://anyorigin.com/go?url=";
  private crossOriginUrl: string = "https://crossorigin.me/";
  private whateverOriginUrl: string = "http://www.whateverorigin.org/get?url=";

  constructor(private readonly http: HttpClient) { }

  @validate(of(null))
  get<T>(@required(ValidationRequiredType.String) url: string, useProxyService: boolean = false): Observable<T> {
    return this.http
      .get(useProxyService ? (this.allOriginsUrl + url) : url)
      .pipe(
        map(response => {
          let value: T = null;

          if (useProxyService && response && response.hasOwnProperty("contents")) {
            value = JSON.parse(response["contents"].toString());
          } else if (response) {
            value = response as T;
          }

          if (value.hasOwnProperty("cod") && (value["cod"] !== 200 && value["cod"] !== "200") && value.hasOwnProperty("message")) {
            console.warn(value["message"]);
            return null;
          }

          return value;
        }),
        catchError(error => {
          return of(null);
        }));
  }
}
