import { TestBed } from "@angular/core/testing";

import MockServices from "../mock/services.mock";
import MockValues from "../mock/values.mock";

import { UvIndex } from "./uv-index";

describe("UvIndex", () => {
    let classToTest: UvIndex;

    const serviceMockList: any[] = [
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: []
        });

        classToTest = new UvIndex();
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

    it("isDefault should return true", () => {
        // Arrange
        const uvIndex = new UvIndex();

        // Act
        const isDefault = uvIndex.isDefault();

        // Assert
        expect(isDefault).toBeTruthy();
    });

    it("isDefault should return false", () => {
        // Arrange
        const uvIndex = new UvIndex();
        uvIndex.value = 4.20;

        // Act
        const isDefault = uvIndex.isDefault();

        // Assert
        expect(isDefault).toBeFalsy();
    });
});
