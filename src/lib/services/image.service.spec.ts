import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";

import { substitute } from "@lib/mock";

import { ApiService } from "@lib/services/api.service";

import { ImageService } from "./image.service";

describe("ImageService", () => {
    let classToTest: ImageService;

    const apiServiceMock = substitute(ApiService);

    const serviceMockList: any[] = [
        apiServiceMock
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: ApiService, useValue: apiServiceMock }
            ]
        });

        classToTest = new ImageService(apiServiceMock);
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

    it("receiveImagePictureUrl should call apiService and return a url", (done: DoneFn) => {
        // Arrange
        classToTest["accessKey"] = "MyAccessKey";
        apiServiceMock.get.and.returnValue(of({ total: 1, results: [{ urls: { small: "Just an url" } }] }));

        classToTest.cityPictureUrl().subscribe(url => {
            if (url) {
                // Assert
                expect(url).toBe("Just an url");
                done();
            }
        });

        // Act
        classToTest.receiveImagePictureUrl("Nuremberg");
    });
});
