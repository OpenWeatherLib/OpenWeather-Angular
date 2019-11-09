import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { cold, hot } from "jasmine-marbles";
import { Observable } from "rxjs";

import { City } from "@lib/models";
import { substitute } from "@lib/mock";
import { CityService } from "@lib/services";
import { loadCityErrorAction, loadCityRequestAction, loadCitySuccessAction } from "./city.actions";
import { CityStoreEffects } from "./city.effects";

describe("City Effects Tests", () => {

    let testEffects: CityStoreEffects;
    let actions$: Observable<any>;

    const cityServiceMock = substitute(CityService);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CityStoreEffects,
                provideMockActions(() => actions$),
                { provide: CityService, useValue: cityServiceMock }
            ]
        });

        testEffects = TestBed.get(CityStoreEffects);
    });

    describe("loadCityDataEffect$", () => {
        test("should return a loadCityRequestAction, with data, on success", () => {
            // Arrange
            const result: City = {} as City;
            const responseFromService = cold("-b", { b: result });
            const action = loadCityRequestAction({ cityName: "Nuremberg" });
            const completion = loadCitySuccessAction({ city: {} as City });
            const expected = cold("-c", { c: completion });

            // Act
            actions$ = hot("a", { a: action });
            cityServiceMock.loadCityData.mockReturnValue(responseFromService);

            // Assert
            expect(testEffects.loadCityDataEffect$).toBeObservable(expected);
        });

        test("should return a loadCityDataEffect, with data, on error", () => {
            // Arrange
            const result = new Error("Error") as any;
            const responseFromService = cold("-#|", {}, result);
            const action = loadCityRequestAction({ cityName: "Nuremberg" });
            const completion = loadCityErrorAction({ error: result });
            const expected = cold("--b", { b: completion });

            // Act
            actions$ = hot("-a", { a: action });
            cityServiceMock.loadCityData.mockReturnValue(responseFromService);

            // Assert
            expect(testEffects.loadCityDataEffect$).toBeObservable(expected);
        });
    });
});
