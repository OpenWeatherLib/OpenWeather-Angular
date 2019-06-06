import { TestBed, async } from "@angular/core/testing";
import { of } from "rxjs";

import { substitute } from "@lib/mock";

import { OpenWeatherService } from "@lib/services";

import { WeatherForecasstComponent } from "./weather-forecast.component";

describe("WeatherForecasstComponent", () => {
  let classToTest: WeatherForecasstComponent;

  const openWeatherServiceMock = substitute(OpenWeatherService);

  const serviceMockList: any[] = [
    openWeatherServiceMock
  ];

  beforeEach(() => {
    openWeatherServiceMock.forecastWeather.and.returnValue(of(null));

    TestBed.configureTestingModule({
      declarations: [
        WeatherForecasstComponent
      ],
      providers: [
        { provide: OpenWeatherService, useValue: openWeatherServiceMock }
      ]
    }).overrideTemplate(WeatherForecasstComponent, "<div></div>").compileComponents();

    const fixture = TestBed.createComponent(WeatherForecasstComponent);
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
