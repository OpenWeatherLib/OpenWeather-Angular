import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { environment } from "@environments/environment";
import { required, validate } from "@lib/decorator";
import { UnsplashImageOrientation, ValidationRequiredType } from "@lib/enums";
import { format } from "@lib/helper";
import { UnsplashImageResponse } from "@lib/models";
import { ApiService } from "@lib/services/api.service";

@Injectable()
export class ImageService {

    constructor(private readonly apiService: ApiService) { }

    @validate(of(undefined))
    loadImagePictureUrl(
        @required(ValidationRequiredType.String) cityName: string,
        @required(ValidationRequiredType.Enum) orientation: UnsplashImageOrientation): Observable<string> {
        return this.apiService
            .get<UnsplashImageResponse>(format(environment.urls.apis.image, environment.keys.unsplashAccess, orientation, cityName))
            .pipe(
                map((response: UnsplashImageResponse) => (!!response && !!response.total && !!response.results) ? response.results[0].urls.small : undefined),
                catchError((error: any) => { console.error(error.toString()); return of(undefined); }));
    }
}
