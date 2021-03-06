import { TestBed } from "@angular/core/testing";
import { Actions } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { combineReducers, StoreModule } from "@ngrx/store";
import { provideMockStore } from "@ngrx/store/testing";
import { cold, hot } from "jasmine-marbles";
import { Observable } from "rxjs";

import { City, WeatherCurrent } from "@lib/models";
import { substitute } from "@lib/mock";
import { OpenWeatherService } from "@lib/services";
import { loadCitySuccessAction } from "../city-store/city.actions";
import { RootState } from "../root-state";
import { loadWeatherCurrentErrorAction, loadWeatherCurrentRequestAction, loadWeatherCurrentSuccessAction } from "./weather-current.actions";
import { WeatherCurrentStoreEffects } from "./weather-current.effects";
import { weatherCurrentReducer } from "./weather-current.reducer";

describe("Weather Current Effects Tests", () => {

    let testEffects: WeatherCurrentStoreEffects;
    let actions$: Observable<any>;

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

        test("should return a loadWeatherCurrentRequestAction, with data, on error | loadWeatherCurrentRequestAction", () => {
            // Arrange
            const result = new Error("Error") as any;
            const responseFromService = cold("-#|", {}, result);
            const action = loadWeatherCurrentRequestAction({ city: {} as City });
            const completion = loadWeatherCurrentErrorAction({ error: result });
            const expected = cold("--b", { b: completion });

            // Act
            actions$ = hot("-a", { a: action });
            openWeatherServiceMock.loadWeatherCurrent.mockReturnValue(responseFromService);

            // Assert
            expect(testEffects.loadWeatherCurrentEffect$).toBeObservable(expected);
        });

        test("should return a loadWeatherCurrentRequestAction, with data, on success | loadCitySuccessAction", () => {
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

        test("should return a loadWeatherCurrentRequestAction, with data, on error | loadCitySuccessAction", () => {
            // Arrange
            const result = new Error("Error") as any;
            const responseFromService = cold("-#|", {}, result);
            const action = loadCitySuccessAction({ city: {} as City });
            const completion = loadWeatherCurrentErrorAction({ error: result });
            const expected = cold("--b", { b: completion });

            // Act
            actions$ = hot("-a", { a: action });
            openWeatherServiceMock.loadWeatherCurrent.mockReturnValue(responseFromService);

            // Assert
            expect(testEffects.loadWeatherCurrentEffect$).toBeObservable(expected);
        });
    });
});
