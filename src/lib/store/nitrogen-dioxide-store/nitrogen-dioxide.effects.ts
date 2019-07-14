import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, concatMap, map, switchMap, withLatestFrom } from "rxjs/operators";

import { NitrogenDioxide } from "@lib/models";
import { OpenWeatherService } from "@lib/services";
import { loadCitySuccessAction } from "../city-store/city.actions";
import { RootState } from "../root-state";
import { loadNitrogenDioxideRequestAction, loadNitrogenDioxideSuccessAction, loadNitrogenDioxideErrorAction } from "./nitrogen-dioxide.actions";

@Injectable()
export class NitrogenDioxideStoreEffects {

    constructor(
        private readonly actions$: Actions,
        private readonly store$: Store<RootState>,
        private readonly openWeatherService: OpenWeatherService) { }

    loadNitrogenDioxideEffect$ = createEffect(
        () => this.actions$.pipe(
            ofType(loadNitrogenDioxideRequestAction, loadCitySuccessAction),
            map(action => action.city),
            concatMap((action) => of(action).pipe(
                withLatestFrom(this.store$)
            )),
            switchMap(([city, rootState]) =>
                this.openWeatherService
                    .loadNitrogenDioxide(!!city ? city : rootState.cityState.city, rootState.nitrogenDioxideState.dateTime, rootState.nitrogenDioxideState.accuracy)
                    .pipe(
                        map((nitrogenDioxide: NitrogenDioxide) => loadNitrogenDioxideSuccessAction({ nitrogenDioxide })),
                        catchError((error: any) => of(loadNitrogenDioxideErrorAction({ error })))
                    )
            )),
        { resubscribeOnError: false });
}
