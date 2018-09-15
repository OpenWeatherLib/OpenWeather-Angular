import { TestBed } from "@angular/core/testing";

// import MockServices from "@lib/mock/services.mock";
// import MockValues from "@lib/mock/values.mock";

import { JsonToDataConverter } from "./json-to-data-converter";

describe("JsonToDataConverter", () => {
    let classToTest: JsonToDataConverter;

    const serviceMockList: any[] = [
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                JsonToDataConverter
            ]
        });

        classToTest = TestBed.get(JsonToDataConverter);
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
