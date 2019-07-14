import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { combineReducers, Store, StoreModule } from "@ngrx/store";
import { cold, hot } from "jasmine-marbles";
import { Observable } from "rxjs";

import { City, UvIndex } from "@lib/models";
import { substitute } from "@lib/mock";
import { OpenWeatherService } from "@lib/services";
import { loadCitySuccessAction } from "../city-store/city.actions";
import { RootState } from "../root-state";
import { loadUvIndexRequestAction, loadUvIndexSuccessAction } from "./uv-index.actions";
import { UvIndexStoreEffects } from "./uv-index.effects";
import { uvIndexReducer } from "./uv-index.reducer";

describe("UvIndex Effects Tests", () => {

    let testEffects: UvIndexStoreEffects;
    let actions$: Observable<any>;
    let store$: Store<RootState>;

    const openWeatherServiceMock = substitute(OpenWeatherService);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                UvIndexStoreEffects,
                provideMockActions(() => actions$),
                { provide: OpenWeatherService, useValue: openWeatherServiceMock }
            ],
            imports: [
                StoreModule.forRoot({ uvIndex: combineReducers(uvIndexReducer) })
            ]
        });

        store$ = TestBed.get(Store);
        testEffects = TestBed.get(UvIndexStoreEffects);
    });

    describe("loadUvIndexEffect$", () => {
        test("should return a loadUvIndexRequestAction, with data, on success | loadUvIndexRequestAction", () => {
            // Arrange
            const result: UvIndex = {} as UvIndex;
            const responseFromService = cold("-b", { b: result });
            const action = loadUvIndexRequestAction({ city: {} as City });
            const completion = loadUvIndexSuccessAction({ uvIndex: {} as UvIndex });
            const expected = cold("-c", { c: completion });

            // Act
            actions$ = hot("a", { a: action });
            openWeatherServiceMock.loadUvIndex.mockReturnValue(responseFromService);

            // Assert
            expect(testEffects.loadUvIndexEffect$).toBeObservable(expected);
        });

        test("should return a loadCitySuccessAction, with data, on success | loadCitySuccessAction", () => {
            // Arrange
            const result: UvIndex = {} as UvIndex;
            const responseFromService = cold("-b", { b: result });
            const action = loadCitySuccessAction({ city: {} as City });
            const completion = loadUvIndexSuccessAction({ uvIndex: {} as UvIndex });
            const expected = cold("-c", { c: completion });

            // Act
            actions$ = hot("a", { a: action });
            openWeatherServiceMock.loadUvIndex.mockReturnValue(responseFromService);

            // Assert
            expect(testEffects.loadUvIndexEffect$).toBeObservable(expected);
        });
    });
});
