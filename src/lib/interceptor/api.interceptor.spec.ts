import { TestBed } from "@angular/core/testing";

// import MockServices from "@lib/mock/services.mock";
// import MockValues from "@lib/mock/values.mock";

import { ApiInterceptor } from "./api.interceptor";

describe("ApiInterceptor", () => {
    let classToTest: ApiInterceptor;

    const serviceMockList: any[] = [
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ApiInterceptor
            ]
        });

        classToTest = TestBed.get(ApiInterceptor);
    });

    afterEach(() => {
        serviceMockList.forEach(serviceMock => {
            for (const propertyName in serviceMock) {
                if (serviceMock.hasOwnProperty(propertyName)) {
                    serviceMock[propertyName].calls.reset();
                    serviceMock[propertyName].and.stub();
                }
            }
        });
    });

    it("should be created", () => {
        // Assert
        expect(classToTest).toBeTruthy();
    });
});
