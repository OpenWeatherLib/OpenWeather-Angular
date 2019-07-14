import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { UnsplashImageOrientation } from "@lib/enums";
import { ImageService } from "@lib/services";
import { loadCitySuccessAction } from "../city-store/city.actions";
import { loadImageUrlSuccessAction, loadImageUrlErrorAction } from "./image.actions";

@Injectable()
export class ImageStoreEffects {

    constructor(
        private readonly actions$: Actions,
        private readonly imageService: ImageService) { }

    loadImagePictureUrlEffect$ = createEffect(
        () => this.actions$.pipe(
            ofType(loadCitySuccessAction),
            switchMap((action: any) =>
                this.imageService
                    .loadImagePictureUrl(action.city.name, UnsplashImageOrientation.Squarish)
                    .pipe(
                        map((url: string) => loadImageUrlSuccessAction({ url })),
                        catchError((error: any) => of(loadImageUrlErrorAction({ error })))
                    )
            )),
        { resubscribeOnError: false });
}
