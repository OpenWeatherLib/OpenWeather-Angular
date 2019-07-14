import { TestBed } from "@angular/core/testing";

import { ApiInterceptor } from "./api.interceptor";

describe("ApiInterceptor", () => {
    let classToTest: ApiInterceptor;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ApiInterceptor
            ]
        });

        classToTest = TestBed.get(ApiInterceptor);
    });

    test("should be created", () => {
        // Assert
        expect(classToTest).toBeTruthy();
    });
});
