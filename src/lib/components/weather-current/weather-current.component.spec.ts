import { TestBed, async } from "@angular/core/testing";
import { of } from "rxjs";

import { substitute } from "@lib/mock";

import { OpenWeatherService } from "@lib/services";

import { WeatherCurrentComponent } from "./weather-current.component";

describe("WeatherCurrentComponent", () => {
  let classToTest: WeatherCurrentComponent;

  const openWeatherServiceMock = substitute(OpenWeatherService);

  const serviceMockList: any[] = [
    openWeatherServiceMock
  ];

  beforeEach(() => {
    openWeatherServiceMock.currentWeather.and.returnValue(of(null));

    TestBed.configureTestingModule({
      declarations: [
        WeatherCurrentComponent
      ],
      providers: [
        { provide: OpenWeatherService, useValue: openWeatherServiceMock }
      ]
    }).overrideTemplate(WeatherCurrentComponent, "<div></div>").compileComponents();

    const fixture = TestBed.createComponent(WeatherCurrentComponent);
    classToTest = fixture.debugElement.componentInstance;
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

  it("should create the app", async(() => {
    // Assert
    expect(classToTest).toBeTruthy();
  }));
});
