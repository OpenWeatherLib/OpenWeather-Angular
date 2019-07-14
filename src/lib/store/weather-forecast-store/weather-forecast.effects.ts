import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, concatMap, map, switchMap, withLatestFrom } from "rxjs/operators";

import { WeatherForecast } from "@lib/models";
import { OpenWeatherService } from "@lib/services";
import { loadCitySuccessAction } from "../city-store/city.actions";
import { RootState } from "../root-state";
import { loadWeatherForecastRequestAction, loadWeatherForecastSuccessAction, loadWeatherForecastErrorAction } from "./weather-forecast.actions";

@Injectable()
export class WeatherForecastStoreEffects {

    constructor(
        private readonly actions$: Actions,
        private readonly store$: Store<RootState>,
        private readonly openWeatherService: OpenWeatherService) { }

    loadWeatherForecastEffect$ = createEffect(
        () => this.actions$.pipe(
            ofType(loadWeatherForecastRequestAction, loadCitySuccessAction),
            map(action => action.city),
            concatMap((action) => of(action).pipe(
                withLatestFrom(this.store$)
            )),
            switchMap(([city, rootState]) =>
                this.openWeatherService
                    .loadWeatherForecast(!!city ? city : rootState.cityState.city)
                    .pipe(
                        map((weatherForecast: WeatherForecast) => loadWeatherForecastSuccessAction({ weatherForecast })),
                        catchError((error: any) => of(loadWeatherForecastErrorAction({ error })))
                    )
            )),
        { resubscribeOnError: false });
}
