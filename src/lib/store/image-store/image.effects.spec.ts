import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { cold, hot } from "jasmine-marbles";
import { Observable } from "rxjs";

import { substitute } from "@lib/mock";
import { City } from "@lib/models";
import { ImageService } from "@lib/services";
import { loadCitySuccessAction } from "../city-store/city.actions";
import { loadImageUrlErrorAction, loadImageUrlSuccessAction } from "./image.actions";
import { ImageStoreEffects } from "./image.effects";

describe("Image Effects Tests", () => {

    let testEffects: ImageStoreEffects;
    let actions$: Observable<any>;

    const imageServiceMock = substitute(ImageService);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ImageStoreEffects,
                provideMockActions(() => actions$),
                { provide: ImageService, useValue: imageServiceMock }
            ]
        });

        testEffects = TestBed.get(ImageStoreEffects);
    });

    describe("loadImagePictureUrlEffect$", () => {
        test("should return a loadCitySuccessAction, with data, on success", () => {
            // Arrange
            const result: string = "New URL";
            const responseFromService = cold("-b", { b: result });
            const action = loadCitySuccessAction({ city: { name: "Nuremberg" } as City });
            const completion = loadImageUrlSuccessAction({ url: "New URL" });
            const expected = cold("-c", { c: completion });

            // Act
            actions$ = hot("a", { a: action });
            imageServiceMock.loadImagePictureUrl.mockReturnValue(responseFromService);

            // Assert
            expect(testEffects.loadImagePictureUrlEffect$).toBeObservable(expected);
        });

        test("should return a loadImageUrlErrorAction, with data, on error", () => {
            // Arrange
            const result = new Error("Error") as any;
            const responseFromService = cold("-#|", {}, result);
            const action = loadCitySuccessAction({ city: { name: "Nuremberg" } as City });
            const completion = loadImageUrlErrorAction({ error: result });
            const expected = cold("--b", { b: completion });

            // Act
            actions$ = hot("-a", { a: action });
            imageServiceMock.loadImagePictureUrl.mockReturnValue(responseFromService);

            // Assert
            expect(testEffects.loadImagePictureUrlEffect$).toBeObservable(expected);
        });
    });
});
