import { TestBed } from "@angular/core/testing";
import { Actions } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { combineReducers, StoreModule } from "@ngrx/store";
import { provideMockStore } from "@ngrx/store/testing";
import { cold, hot } from "jasmine-marbles";
import { Observable } from "rxjs";

import { City, NitrogenDioxide } from "@lib/models";
import { substitute } from "@lib/mock";
import { OpenWeatherService } from "@lib/services";
import { loadCitySuccessAction } from "../city-store/city.actions";
import { RootState } from "../root-state";
import { loadNitrogenDioxideErrorAction, loadNitrogenDioxideRequestAction, loadNitrogenDioxideSuccessAction } from "./nitrogen-dioxide.actions";
import { NitrogenDioxideStoreEffects } from "./nitrogen-dioxide.effects";
import { nitrogenDioxideReducer } from "./nitrogen-dioxide.reducer";

describe("NitrogenDioxide Effects Tests", () => {

    let testEffects: NitrogenDioxideStoreEffects;
    let actions$: Observable<any>;

    const initialState: RootState = {
        cityState: { city: {} as City },
        nitrogenDioxideState: { accuracy: 2, dateTime: "DateTime" }
    } as RootState;

    const openWeatherServiceMock = substitute(OpenWeatherService);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                NitrogenDioxideStoreEffects,
                provideMockActions(() => actions$),
                provideMockStore({ initialState }),
                { provide: OpenWeatherService, useValue: openWeatherServiceMock }
            ],
            imports: [
                StoreModule.forRoot({ nitrogenDioxide: combineReducers(nitrogenDioxideReducer) })
            ]
        });

        testEffects = TestBed.get(NitrogenDioxideStoreEffects);
        actions$ = TestBed.get(Actions);
    });

    describe("loadNitrogenDioxideEffect$", () => {
        test("should return a loadNitrogenDioxideRequestAction, with data, on success | loadNitrogenDioxideRequestAction", () => {
            // Arrange
            const result: NitrogenDioxide = {} as NitrogenDioxide;
            const responseFromService = cold("-b", { b: result });
            const action = loadNitrogenDioxideRequestAction({ city: {} as City });
            const completion = loadNitrogenDioxideSuccessAction({ nitrogenDioxide: {} as NitrogenDioxide });
            const expected = cold("-c", { c: completion });

            // Act
            actions$ = hot("a", { a: action });
            openWeatherServiceMock.loadNitrogenDioxide.mockReturnValue(responseFromService);

            // Assert
            expect(testEffects.loadNitrogenDioxideEffect$).toBeObservable(expected);
        });

        test("should return a loadNitrogenDioxideRequestAction, with data, on error | loadNitrogenDioxideRequestAction", () => {
            // Arrange
            const result = new Error("Error") as any;
            const responseFromService = cold("-#|", {}, result);
            const action = loadNitrogenDioxideRequestAction({ city: {} as City });
            const completion = loadNitrogenDioxideErrorAction({ error: result });
            const expected = cold("--b", { b: completion });

            // Act
            actions$ = hot("-a", { a: action });
            openWeatherServiceMock.loadNitrogenDioxide.mockReturnValue(responseFromService);

            // Assert
            expect(testEffects.loadNitrogenDioxideEffect$).toBeObservable(expected);
        });

        test("should return a loadNitrogenDioxideRequestAction, with data, on success | loadCitySuccessAction", () => {
            // Arrange
            const result: NitrogenDioxide = {} as NitrogenDioxide;
            const responseFromService = cold("-b", { b: result });
            const action = loadCitySuccessAction({ city: {} as City });
            const completion = loadNitrogenDioxideSuccessAction({ nitrogenDioxide: {} as NitrogenDioxide });
            const expected = cold("-c", { c: completion });

            // Act
            actions$ = hot("a", { a: action });
            openWeatherServiceMock.loadNitrogenDioxide.mockReturnValue(responseFromService);

            // Assert
            expect(testEffects.loadNitrogenDioxideEffect$).toBeObservable(expected);
        });

        test("should return a loadNitrogenDioxideRequestAction, with data, on error | loadCitySuccessAction", () => {
            // Arrange
            const result = new Error("Error") as any;
            const responseFromService = cold("-#|", {}, result);
            const action = loadCitySuccessAction({ city: {} as City });
            const completion = loadNitrogenDioxideErrorAction({ error: result });
            const expected = cold("--b", { b: completion });

            // Act
            actions$ = hot("-a", { a: action });
            openWeatherServiceMock.loadNitrogenDioxide.mockReturnValue(responseFromService);

            // Assert
            expect(testEffects.loadNitrogenDioxideEffect$).toBeObservable(expected);
        });
    });
});
