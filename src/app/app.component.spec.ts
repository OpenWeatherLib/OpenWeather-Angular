import { TestBed, async } from "@angular/core/testing";

import MockServices from "@lib/mock/services.mock";
// import MockValues from "@lib/mock/values.mock";

import { ApiService, ImageService, OpenWeatherService } from "@lib/services";

import { AppComponent } from "./app.component";

describe("AppComponent", () => {
  let classToTest: AppComponent;

  const apiServiceMock = MockServices.substitute(ApiService);
  const imageServiceMock = MockServices.substitute(ImageService);
  const openWeatherServiceMock = MockServices.substitute(OpenWeatherService);

  const serviceMockList: any[] = [
    apiServiceMock,
    imageServiceMock,
    openWeatherServiceMock
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: ApiService, useValue: apiServiceMock },
        { provide: ImageService, useValue: imageServiceMock },
        { provide: OpenWeatherService, useValue: openWeatherServiceMock }
      ]
    }).overrideTemplate(AppComponent, "<div>Test</div>").compileComponents();

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
