import { HttpHandler, HttpRequest } from "@angular/common/http";
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

    describe("intercept", () => {
        test("should handle request", () => {
            // Arrange
            const httpRequest: HttpRequest<any> = {} as HttpRequest<any>;
            const next: HttpHandler = {
                handle: jest.fn()
            };

            // Act
            classToTest.intercept(httpRequest, next);

            // Assert
            expect(next.handle).toHaveBeenCalledTimes(1);
            expect(next.handle).toHaveBeenCalledWith(httpRequest);
        });
    });
});
