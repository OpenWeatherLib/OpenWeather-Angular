import { TestBed } from "@angular/core/testing";
import { Actions } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { combineReducers, Store, StoreModule } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { cold, hot } from "jasmine-marbles";
import { Observable } from "rxjs";

import { City, WeatherForecast } from "@lib/models";
import { substitute } from "@lib/mock";
import { OpenWeatherService } from "@lib/services";
import { loadCitySuccessAction } from "../city-store/city.actions";
import { RootState } from "../root-state";
import { loadWeatherForecastRequestAction, loadWeatherForecastSuccessAction } from "./weather-forecast.actions";
import { WeatherForecastStoreEffects } from "./weather-forecast.effects";
import { weatherForecastReducer } from "./weather-forecast.reducer";

describe("Weather Forecast Effects Tests", () => {

    let testEffects: WeatherForecastStoreEffects;
    let actions$: Observable<any>;
    let store$: MockStore<RootState>;

    const initialState: RootState = {
        cityState: { city: {} as City }
    } as RootState;

    const openWeatherServiceMock = substitute(OpenWeatherService);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                WeatherForecastStoreEffects,
                provideMockActions(() => actions$),
                provideMockStore({ initialState }),
                { provide: OpenWeatherService, useValue: openWeatherServiceMock }
            ],
            imports: [
                StoreModule.forRoot({ weatherForecast: combineReducers(weatherForecastReducer) })
            ]
        });

        testEffects = TestBed.get(WeatherForecastStoreEffects);
        actions$ = TestBed.get(Actions);
        store$ = TestBed.get(Store);
    });

    describe("loadWeatherForecastEffect$", () => {
        test("should return a loadWeatherForecastRequestAction, with data, on success | loadWeatherForecastRequestAction", () => {
            // Arrange
            const result: WeatherForecast = {} as WeatherForecast;
            const responseFromService = cold("-b", { b: result });
            const action = loadWeatherForecastRequestAction({ city: {} as City });
            const completion = loadWeatherForecastSuccessAction({ weatherForecast: {} as WeatherForecast });
            const expected = cold("-c", { c: completion });

            // Act
            actions$ = hot("a", { a: action });
            openWeatherServiceMock.loadWeatherForecast.mockReturnValue(responseFromService);

            // Assert
            expect(testEffects.loadWeatherForecastEffect$).toBeObservable(expected);
        });

        test("should return a loadCitySuccessAction, with data, on success | loadCitySuccessAction", () => {
            // Arrange
            const result: WeatherForecast = {} as WeatherForecast;
            const responseFromService = cold("-b", { b: result });
            const action = loadCitySuccessAction({ city: {} as City });
            const completion = loadWeatherForecastSuccessAction({ weatherForecast: {} as WeatherForecast });
            const expected = cold("-c", { c: completion });

            // Act
            actions$ = hot("a", { a: action });
            openWeatherServiceMock.loadWeatherForecast.mockReturnValue(responseFromService);

            // Assert
            expect(testEffects.loadWeatherForecastEffect$).toBeObservable(expected);
        });
    });
});
