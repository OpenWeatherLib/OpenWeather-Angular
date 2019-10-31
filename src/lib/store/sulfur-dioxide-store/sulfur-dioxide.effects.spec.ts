import { TestBed } from "@angular/core/testing";
import { Actions } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { combineReducers, StoreModule } from "@ngrx/store";
import { provideMockStore } from "@ngrx/store/testing";
import { cold, hot } from "jasmine-marbles";
import { Observable } from "rxjs";

import { City, SulfurDioxide } from "@lib/models";
import { substitute } from "@lib/mock";
import { OpenWeatherService } from "@lib/services";
import { loadCitySuccessAction } from "../city-store/city.actions";
import { RootState } from "../root-state";
import { loadSulfurDioxideRequestAction, loadSulfurDioxideSuccessAction } from "./sulfur-dioxide.actions";
import { SulfurDioxideStoreEffects } from "./sulfur-dioxide.effects";
import { sulfurDioxideReducer } from "./sulfur-dioxide.reducer";

describe("SulfurDioxide Effects Tests", () => {

    let testEffects: SulfurDioxideStoreEffects;
    let actions$: Observable<any>;

    const initialState: RootState = {
        cityState: { city: {} as City },
        sulfurDioxideState: { accuracy: 2, dateTime: "DateTime" }
    } as RootState;

    const openWeatherServiceMock = substitute(OpenWeatherService);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                SulfurDioxideStoreEffects,
                provideMockActions(() => actions$),
                provideMockStore({ initialState }),
                { provide: OpenWeatherService, useValue: openWeatherServiceMock }
            ],
            imports: [
                StoreModule.forRoot({ sulfurDioxide: combineReducers(sulfurDioxideReducer) })
            ]
        });

        testEffects = TestBed.get(SulfurDioxideStoreEffects);
        actions$ = TestBed.get(Actions);
    });

    describe("loadSulfurDioxideEffect$", () => {
        test("should return a loadSulfurDioxideRequestAction, with data, on success | loadSulfurDioxideRequestAction", () => {
            // Arrange
            const result: SulfurDioxide = {} as SulfurDioxide;
            const responseFromService = cold("-b", { b: result });
            const action = loadSulfurDioxideRequestAction({ city: {} as City });
            const completion = loadSulfurDioxideSuccessAction({ sulfurDioxide: {} as SulfurDioxide });
            const expected = cold("-c", { c: completion });

            // Act
            actions$ = hot("a", { a: action });
            openWeatherServiceMock.loadSulfurDioxide.mockReturnValue(responseFromService);

            // Assert
            expect(testEffects.loadSulfurDioxideEffect$).toBeObservable(expected);
        });

        test("should return a loadCitySuccessAction, with data, on success | loadCitySuccessAction", () => {
            // Arrange
            const result: SulfurDioxide = {} as SulfurDioxide;
            const responseFromService = cold("-b", { b: result });
            const action = loadCitySuccessAction({ city: {} as City });
            const completion = loadSulfurDioxideSuccessAction({ sulfurDioxide: {} as SulfurDioxide });
            const expected = cold("-c", { c: completion });

            // Act
            actions$ = hot("a", { a: action });
            openWeatherServiceMock.loadSulfurDioxide.mockReturnValue(responseFromService);

            // Assert
            expect(testEffects.loadSulfurDioxideEffect$).toBeObservable(expected);
        });
    });
});
