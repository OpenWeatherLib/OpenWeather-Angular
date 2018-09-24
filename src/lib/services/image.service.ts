import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, map, take } from "rxjs/operators";

import "@lib/extensions/string.extensions";

import { environment } from "../../environments/environment";

import { required, validate } from "@lib/decorator";
import { UnsplashImageOrientation, ValidationRequiredType } from "@lib/enums";
import { UnsplashImageResponse } from "@lib/models";
import { ApiService } from "@lib/services/api.service";

@Injectable()
export class ImageService {

    private imageApiUrl: string = "https://api.unsplash.com/search/photos?client_id={0}&orientation={1}&query={2}";

    private accessKey: string = environment.unsplashAccessKey;

    private cityPictureUrl$ = new BehaviorSubject<string>(null);

    constructor(private readonly apiService: ApiService) { }

    cityPictureUrl(): Observable<string> {
        return this.cityPictureUrl$;
    }

    @validate(of(null))
    receiveImagePictureUrl(@required(ValidationRequiredType.String) cityName: string,
        orientation: UnsplashImageOrientation = UnsplashImageOrientation.Squarish): void {

        if (!this.accessKey) {
            return;
        }

        this.apiService.get<UnsplashImageResponse>(String().format(this.imageApiUrl, this.accessKey, orientation, cityName))
            .pipe(
                take(1),
                map(response => {
                    if (response && response.total && response.results) {
                        return response.results[0].urls.small;
                    }
                    return null;
                }),
                catchError(error => {
                    console.error(error.toString());
                    return null;
                }))
            .subscribe(response => {
                if (response) {
                    this.cityPictureUrl$.next(response);
                }
            });
    }
}
