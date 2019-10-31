import { TestBed } from "@angular/core/testing";
import { Actions } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { combineReducers, StoreModule } from "@ngrx/store";
import { provideMockStore } from "@ngrx/store/testing";
import { cold, hot } from "jasmine-marbles";
import { Observable } from "rxjs";

import { City, CarbonMonoxide } from "@lib/models";
import { substitute } from "@lib/mock";
import { OpenWeatherService } from "@lib/services";
import { loadCitySuccessAction } from "../city-store/city.actions";
import { RootState } from "../root-state";
import { loadCarbonMonoxideRequestAction, loadCarbonMonoxideSuccessAction } from "./carbon-monoxide.actions";
import { CarbonMonoxideStoreEffects } from "./carbon-monoxide.effects";
import { carbonMonoxideReducer } from "./carbon-monoxide.reducer";

describe("CarbonMonoxide Effects Tests", () => {

    let testEffects: CarbonMonoxideStoreEffects;
    let actions$: Observable<any>;

    const initialState: RootState = {
        cityState: { city: {} as City },
        carbonMonoxideState: { accuracy: 2, dateTime: "DateTime" }
    } as RootState;

    const openWeatherServiceMock = substitute(OpenWeatherService);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CarbonMonoxideStoreEffects,
                provideMockActions(() => actions$),
                provideMockStore({ initialState }),
                { provide: OpenWeatherService, useValue: openWeatherServiceMock }
            ],
            imports: [
                StoreModule.forRoot({ carbonMonoxide: combineReducers(carbonMonoxideReducer) })
            ]
        });

        testEffects = TestBed.get(CarbonMonoxideStoreEffects);
        actions$ = TestBed.get(Actions);
    });

    describe("loadCarbonMonoxideEffect$", () => {
        test("should return a loadCarbonMonoxideRequestAction, with data, on success | loadCarbonMonoxideRequestAction", () => {
            // Arrange
            const result: CarbonMonoxide = {} as CarbonMonoxide;
            const responseFromService = cold("-b", { b: result });
            const action = loadCarbonMonoxideRequestAction({ city: {} as City });
            const completion = loadCarbonMonoxideSuccessAction({ carbonMonoxide: {} as CarbonMonoxide });
            const expected = cold("-c", { c: completion });

            // Act
            actions$ = hot("a", { a: action });
            openWeatherServiceMock.loadCarbonMonoxide.mockReturnValue(responseFromService);

            // Assert
            expect(testEffects.loadCarbonMonoxideEffect$).toBeObservable(expected);
        });

        test("should return a loadCitySuccessAction, with data, on success | loadCitySuccessAction", () => {
            // Arrange
            const result: CarbonMonoxide = {} as CarbonMonoxide;
            const responseFromService = cold("-b", { b: result });
            const action = loadCitySuccessAction({ city: {} as City });
            const completion = loadCarbonMonoxideSuccessAction({ carbonMonoxide: {} as CarbonMonoxide });
            const expected = cold("-c", { c: completion });

            // Act
            actions$ = hot("a", { a: action });
            openWeatherServiceMock.loadCarbonMonoxide.mockReturnValue(responseFromService);

            // Assert
            expect(testEffects.loadCarbonMonoxideEffect$).toBeObservable(expected);
        });
    });
});
