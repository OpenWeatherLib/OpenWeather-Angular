import { TestBed } from "@angular/core/testing";
import { Actions } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { combineReducers, StoreModule } from "@ngrx/store";
import { provideMockStore } from "@ngrx/store/testing";
import { cold, hot } from "jasmine-marbles";
import { Observable } from "rxjs";

import { City, Ozone } from "@lib/models";
import { substitute } from "@lib/mock";
import { OpenWeatherService } from "@lib/services";
import { loadCitySuccessAction } from "../city-store/city.actions";
import { RootState } from "../root-state";
import { loadOzoneRequestAction, loadOzoneSuccessAction } from "./ozone.actions";
import { OzoneStoreEffects } from "./ozone.effects";
import { ozoneReducer } from "./ozone.reducer";

describe("Ozone Effects Tests", () => {

    let testEffects: OzoneStoreEffects;
    let actions$: Observable<any>;

    const initialState: RootState = {
        cityState: { city: {} as City },
        ozoneState: { accuracy: 2, dateTime: "DateTime" }
    } as RootState;

    const openWeatherServiceMock = substitute(OpenWeatherService);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                OzoneStoreEffects,
                provideMockActions(() => actions$),
                provideMockStore({ initialState }),
                { provide: OpenWeatherService, useValue: openWeatherServiceMock }
            ],
            imports: [
                StoreModule.forRoot({ ozone: combineReducers(ozoneReducer) })
            ]
        });

        testEffects = TestBed.get(OzoneStoreEffects);
        actions$ = TestBed.get(Actions);
    });

    describe("loadOzoneEffect$", () => {
        test("should return a loadOzoneRequestAction, with data, on success | loadOzoneRequestAction", () => {
            // Arrange
            const result: Ozone = {} as Ozone;
            const responseFromService = cold("-b", { b: result });
            const action = loadOzoneRequestAction({ city: {} as City });
            const completion = loadOzoneSuccessAction({ ozone: {} as Ozone });
            const expected = cold("-c", { c: completion });

            // Act
            actions$ = hot("a", { a: action });
            openWeatherServiceMock.loadOzone.mockReturnValue(responseFromService);

            // Assert
            expect(testEffects.loadOzoneEffect$).toBeObservable(expected);
        });

        test("should return a loadCitySuccessAction, with data, on success | loadCitySuccessAction", () => {
            // Arrange
            const result: Ozone = {} as Ozone;
            const responseFromService = cold("-b", { b: result });
            const action = loadCitySuccessAction({ city: {} as City });
            const completion = loadOzoneSuccessAction({ ozone: {} as Ozone });
            const expected = cold("-c", { c: completion });

            // Act
            actions$ = hot("a", { a: action });
            openWeatherServiceMock.loadOzone.mockReturnValue(responseFromService);

            // Assert
            expect(testEffects.loadOzoneEffect$).toBeObservable(expected);
        });
    });
});
