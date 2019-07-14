import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, concatMap, map, switchMap, withLatestFrom } from "rxjs/operators";

import { CarbonMonoxide } from "@lib/models";
import { OpenWeatherService } from "@lib/services";
import { loadCitySuccessAction } from "../city-store/city.actions";
import { RootState } from "../root-state";
import { loadCarbonMonoxideRequestAction, loadCarbonMonoxideSuccessAction, loadCarbonMonoxideErrorAction } from "./carbon-monoxide.actions";

@Injectable()
export class CarbonMonoxideStoreEffects {

    constructor(
        private readonly actions$: Actions,
        private readonly store$: Store<RootState>,
        private readonly openWeatherService: OpenWeatherService) { }

    loadCarbonMonoxideEffect$ = createEffect(
        () => this.actions$.pipe(
            ofType(loadCarbonMonoxideRequestAction, loadCitySuccessAction),
            map(action => action.city),
            concatMap((action) => of(action).pipe(
                withLatestFrom(this.store$)
            )),
            switchMap(([city, rootState]) =>
                this.openWeatherService
                    .loadCarbonMonoxide(!!city ? city : rootState.cityState.city, rootState.carbonMonoxideState.dateTime, rootState.carbonMonoxideState.accuracy)
                    .pipe(
                        map((carbonMonoxide: CarbonMonoxide) => loadCarbonMonoxideSuccessAction({ carbonMonoxide })),
                        catchError((error: any) => of(loadCarbonMonoxideErrorAction({ error })))
                    )
            )),
        { resubscribeOnError: false });
}
