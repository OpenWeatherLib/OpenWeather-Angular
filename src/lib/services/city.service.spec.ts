/*eslint-disable @typescript-eslint/camelcase */

import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";

import { substitute } from "@lib/mock";
import { City, City2 } from "@lib/models";
import { ApiService } from "@lib/services/api.service";
import { CityService } from "./city.service";

describe("CityService", () => {
    let classToTest: CityService;

    const apiServiceMock = substitute(ApiService);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: ApiService, useValue: apiServiceMock }
            ]
        });

        classToTest = new CityService(apiServiceMock);
    });

    test("should be created", () => {
        // Assert
        expect(classToTest).toBeTruthy();
    });

    describe("loadCityData", () => {
        test("should call apiService and return a url", (done) => {
            // Arrange
            apiServiceMock.get.mockReturnValue(of(
                {
                    status: "OK",
                    results: [
                        {
                            address_components: [{ short_name: "Nuremberg" }, { short_name: "Germany" }],
                            geometry: { location: { lat: 69, lng: 420 } }
                        } as City2
                    ]
                }));

            // Act
            classToTest.loadCityData("Nuremberg").subscribe((city: City) => {
                // Assert
                expect(city).toBeDefined();
                expect(city.name).toBe("Nuremberg");
                expect(city.country).toBe("Germany");
                expect(city.coord.lat).toBe(69);
                expect(city.coord.lon).toBe(420);
                done();
            });
        });
    });
});
