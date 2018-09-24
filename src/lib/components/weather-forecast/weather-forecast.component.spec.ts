import { TestBed, async } from "@angular/core/testing";

import MockServices from "@lib/mock/services.mock";
// import MockValues from "@lib/mock/values.mock";

import { OpenWeatherService } from "@lib/services";

import { WeatherForecasstComponent } from "./weather-forecast.component";

describe("WeatherForecasstComponent", () => {
  let classToTest: WeatherForecasstComponent;

  const openWeatherServiceMock = MockServices.substitute(OpenWeatherService);

  const serviceMockList: any[] = [
    openWeatherServiceMock
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        WeatherForecasstComponent
      ],
      providers: [
        { provide: OpenWeatherService, useValue: openWeatherServiceMock }
      ]
    }).overrideTemplate(WeatherForecasstComponent, "<div>Test</div>").compileComponents();

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
