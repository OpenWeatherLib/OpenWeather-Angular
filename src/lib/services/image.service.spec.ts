import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";

import MockServices from "@lib/mock/services.mock";
// import MockValues from "@lib/mock/values.mock";

import { ApiService } from "@lib/services/api.service";

import { ImageService } from "./image.service";

describe("ImageService", () => {
    let classToTest: ImageService;

    const apiServiceMock = MockServices.substitute(ApiService);

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
        apiServiceMock.get.and.returnValue(of({ total: 1, results: [{ urls: { small: "Just an url" } }] }));

        // Act
        classToTest.receiveImagePictureUrl("Nuremberg")
            .subscribe(url => {
                if (url) {
                    expect(url).toBe("Just an url");
                    done();
                }
            });
    });
});
