import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { City } from "@lib/models";
import { CityService } from "@lib/services";
import { loadCityRequestAction, loadCitySuccessAction, loadCityErrorAction } from "./city.actions";

@Injectable()
export class CityStoreEffects {

    constructor(
        private readonly actions$: Actions,
        private readonly cityService: CityService) { }

    loadCityDataEffect$ = createEffect(
        () => this.actions$.pipe(
            ofType(loadCityRequestAction),
            switchMap((action: any) =>
                this.cityService
                    .loadCityData(action.cityName)
                    .pipe(
                        map((city: City) => loadCitySuccessAction({ city })),
                        catchError((error: any) => of(loadCityErrorAction({ error })))
                    )
            )),
        { resubscribeOnError: false });
}
