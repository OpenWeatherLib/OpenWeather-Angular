import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, concatMap, map, switchMap, withLatestFrom } from "rxjs/operators";

import { UvIndex } from "@lib/models";
import { OpenWeatherService } from "@lib/services";
import { loadCitySuccessAction } from "../city-store/city.actions";
import { RootState } from "../root-state";
import { loadUvIndexRequestAction, loadUvIndexSuccessAction, loadUvIndexErrorAction } from "./uv-index.actions";

@Injectable()
export class UvIndexStoreEffects {

    constructor(
        private readonly actions$: Actions,
        private readonly store$: Store<RootState>,
        private readonly openWeatherService: OpenWeatherService) { }

    loadUvIndexEffect$ = createEffect(
        () => this.actions$.pipe(
            ofType(loadUvIndexRequestAction, loadCitySuccessAction),
            map(action => action.city),
            concatMap((action) => of(action).pipe(
                withLatestFrom(this.store$)
            )),
            switchMap(([city, rootState]) =>
                this.openWeatherService
                    .loadUvIndex(!!city ? city : rootState.cityState.city)
                    .pipe(
                        map((uvIndex: UvIndex) => loadUvIndexSuccessAction({ uvIndex })),
                        catchError((error: any) => of(loadUvIndexErrorAction({ error })))
                    )
            )),
        { resubscribeOnError: false });
}
