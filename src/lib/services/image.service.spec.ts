import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";

import { substitute } from "@lib/mock";
import { UnsplashImageOrientation } from "@lib/enums";
import { UnsplashImageResponse } from "@lib/models";
import { ApiService } from "@lib/services/api.service";
import { ImageService } from "./image.service";

describe("ImageService", () => {
    let classToTest: ImageService;

    const apiServiceMock = substitute(ApiService);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: ApiService, useValue: apiServiceMock }
            ]
        });

        classToTest = new ImageService(apiServiceMock);
    });

    test("should be created", () => {
        // Assert
        expect(classToTest).toBeTruthy();
    });

    describe("loadImagePictureUrl", () => {
        test("should call apiService and return a url", (done) => {
            // Arrange
            apiServiceMock.get.mockReturnValue(of({ total: 1, results: [{ urls: { small: "Just an url" } }] } as UnsplashImageResponse));

            // Act
            classToTest.loadImagePictureUrl("Nuremberg", UnsplashImageOrientation.Squarish).subscribe((url: string) => {
                // Assert
                expect(url).toBeDefined();
                expect(url).toBe("Just an url");
                done();
            });
        });
    });
});
