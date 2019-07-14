import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, concatMap, map, switchMap, withLatestFrom } from "rxjs/operators";

import { SulfurDioxide } from "@lib/models";
import { OpenWeatherService } from "@lib/services";
import { loadCitySuccessAction } from "../city-store/city.actions";
import { RootState } from "../root-state";
import { loadSulfurDioxideRequestAction, loadSulfurDioxideSuccessAction, loadSulfurDioxideErrorAction } from "./sulfur-dioxide.actions";

@Injectable()
export class SulfurDioxideStoreEffects {

    constructor(
        private readonly actions$: Actions,
        private readonly store$: Store<RootState>,
        private readonly openWeatherService: OpenWeatherService) { }

    loadSulfurDioxideEffect$ = createEffect(
        () => this.actions$.pipe(
            ofType(loadSulfurDioxideRequestAction, loadCitySuccessAction),
            map(action => action.city),
            concatMap((action) => of(action).pipe(
                withLatestFrom(this.store$)
            )),
            switchMap(([city, rootState]) =>
                this.openWeatherService
                    .loadSulfurDioxide(!!city ? city : rootState.cityState.city, rootState.sulfurDioxideState.dateTime, rootState.sulfurDioxideState.accuracy)
                    .pipe(
                        map((sulfurDioxide: SulfurDioxide) => loadSulfurDioxideSuccessAction({ sulfurDioxide })),
                        catchError((error: any) => of(loadSulfurDioxideErrorAction({ error })))
                    )
            )),
        { resubscribeOnError: false });
}
