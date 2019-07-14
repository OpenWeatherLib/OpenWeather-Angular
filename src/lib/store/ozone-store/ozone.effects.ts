import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, concatMap, map, switchMap, withLatestFrom } from "rxjs/operators";

import { Ozone } from "@lib/models";
import { OpenWeatherService } from "@lib/services";
import { loadCitySuccessAction } from "../city-store/city.actions";
import { RootState } from "../root-state";
import { loadOzoneRequestAction, loadOzoneSuccessAction, loadOzoneErrorAction } from "./ozone.actions";

@Injectable()
export class OzoneStoreEffects {

    constructor(
        private readonly actions$: Actions,
        private readonly store$: Store<RootState>,
        private readonly openWeatherService: OpenWeatherService) { }

    loadOzoneEffect$ = createEffect(
        () => this.actions$.pipe(
            ofType(loadOzoneRequestAction, loadCitySuccessAction),
            map(action => action.city),
            concatMap((action) => of(action).pipe(
                withLatestFrom(this.store$)
            )),
            switchMap(([city, rootState]) =>
                this.openWeatherService
                    .loadOzone(!!city ? city : rootState.cityState.city, rootState.ozoneState.dateTime, rootState.ozoneState.accuracy)
                    .pipe(
                        map((ozone: Ozone) => loadOzoneSuccessAction({ ozone })),
                        catchError((error: any) => of(loadOzoneErrorAction({ error })))
                    )
            )),
        { resubscribeOnError: false });
}
