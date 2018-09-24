import { TestBed, async } from "@angular/core/testing";

import MockServices from "@lib/mock/services.mock";
// import MockValues from "@lib/mock/values.mock";

import { ImageService, OpenWeatherService } from "@lib/services";

import { CityComponent } from "./city.component";

describe("CityComponent", () => {
  let classToTest: CityComponent;

  const imageServiceMock = MockServices.substitute(ImageService);
  const openWeatherServiceMock = MockServices.substitute(OpenWeatherService);

  const serviceMockList: any[] = [
    imageServiceMock,
    openWeatherServiceMock
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CityComponent
      ],
      providers: [
        { provide: ImageService, useValue: imageServiceMock },
        { provide: OpenWeatherService, useValue: openWeatherServiceMock }
      ]
    }).overrideTemplate(CityComponent, "<div>Test</div>").compileComponents();

    const fixture = TestBed.createComponent(CityComponent);
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
