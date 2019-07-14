import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, concatMap, map, switchMap, withLatestFrom } from "rxjs/operators";

import { WeatherCurrent } from "@lib/models";
import { OpenWeatherService } from "@lib/services";
import { loadCitySuccessAction } from "../city-store/city.actions";
import { RootState } from "../root-state";
import { loadWeatherCurrentRequestAction, loadWeatherCurrentSuccessAction, loadWeatherCurrentErrorAction } from "./weather-current.actions";

@Injectable()
export class WeatherCurrentStoreEffects {

    constructor(
        private readonly actions$: Actions,
        private readonly store$: Store<RootState>,
        private readonly openWeatherService: OpenWeatherService) { }

    loadWeatherCurrentEffect$ = createEffect(
        () => this.actions$.pipe(
            ofType(loadWeatherCurrentRequestAction, loadCitySuccessAction),
            map(action => action.city),
            concatMap((action) => of(action).pipe(
                withLatestFrom(this.store$)
            )),
            switchMap(([city, rootState]) =>
                this.openWeatherService
                    .loadWeatherCurrent(!!city ? city : rootState.cityState.city)
                    .pipe(
                        map((weatherCurrent: WeatherCurrent) => loadWeatherCurrentSuccessAction({ weatherCurrent })),
                        catchError((error: any) => of(loadWeatherCurrentErrorAction({ error })))
                    )
            )),
        { resubscribeOnError: false });
}
