import { TestBed, async } from "@angular/core/testing";

import { substitute } from "@lib/mock";

import { ApiService, OpenWeatherService } from "@lib/services";

import { AppComponent } from "./app.component";

describe("AppComponent", () => {
  let classToTest: AppComponent;

  const apiServiceMock = substitute(ApiService);
  const openWeatherServiceMock = substitute(OpenWeatherService);

  const serviceMockList: any[] = [
    apiServiceMock,
    openWeatherServiceMock
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: ApiService, useValue: apiServiceMock },
        { provide: OpenWeatherService, useValue: openWeatherServiceMock }
      ]
    }).overrideTemplate(AppComponent, "<div></div>").compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
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
