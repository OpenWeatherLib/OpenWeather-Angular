import { TestBed } from "@angular/core/testing";
import { Actions } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { combineReducers, Store, StoreModule } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { cold, hot } from "jasmine-marbles";
import { Observable } from "rxjs";

import { City, WeatherCurrent } from "@lib/models";
import { substitute } from "@lib/mock";
import { OpenWeatherService } from "@lib/services";
import { loadCitySuccessAction } from "../city-store/city.actions";
import { RootState } from "../root-state";
import { loadWeatherCurrentRequestAction, loadWeatherCurrentSuccessAction } from "./weather-current.actions";
import { WeatherCurrentStoreEffects } from "./weather-current.effects";
import { weatherCurrentReducer } from "./weather-current.reducer";

describe("Weather Current Effects Tests", () => {

    let testEffects: WeatherCurrentStoreEffects;
    let actions$: Observable<any>;
    let store$: MockStore<RootState>;

    const initialState: RootState = {
        cityState: { city: {} as City }
    } as RootState;

    const openWeatherServiceMock = substitute(OpenWeatherService);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                WeatherCurrentStoreEffects,
                provideMockActions(() => actions$),
                provideMockStore({ initialState }),
                { provide: OpenWeatherService, useValue: openWeatherServiceMock }
            ],
            imports: [
                StoreModule.forRoot({ weatherCurrent: combineReducers(weatherCurrentReducer) })
            ]
        });

        testEffects = TestBed.get(WeatherCurrentStoreEffects);
        actions$ = TestBed.get(Actions);
        store$ = TestBed.get(Store);
    });

    describe("loadWeatherCurrentEffect$", () => {
        test("should return a loadWeatherCurrentRequestAction, with data, on success | loadWeatherCurrentRequestAction", () => {
            // Arrange
            const result: WeatherCurrent = {} as WeatherCurrent;
            const responseFromService = cold("-b", { b: result });
            const action = loadWeatherCurrentRequestAction({ city: {} as City });
            const completion = loadWeatherCurrentSuccessAction({ weatherCurrent: {} as WeatherCurrent });
            const expected = cold("-c", { c: completion });

            // Act
            actions$ = hot("a", { a: action });
            openWeatherServiceMock.loadWeatherCurrent.mockReturnValue(responseFromService);

            // Assert
            expect(testEffects.loadWeatherCurrentEffect$).toBeObservable(expected);
        });

        test("should return a loadCitySuccessAction, with data, on success | loadCitySuccessAction", () => {
            // Arrange
            const result: WeatherCurrent = {} as WeatherCurrent;
            const responseFromService = cold("-b", { b: result });
            const action = loadCitySuccessAction({ city: {} as City });
            const completion = loadWeatherCurrentSuccessAction({ weatherCurrent: {} as WeatherCurrent });
            const expected = cold("-c", { c: completion });

            // Act
            actions$ = hot("a", { a: action });
            openWeatherServiceMock.loadWeatherCurrent.mockReturnValue(responseFromService);

            // Assert
            expect(testEffects.loadWeatherCurrentEffect$).toBeObservable(expected);
        });
    });
});
