import { TestBed, async } from "@angular/core/testing";
import { of } from "rxjs";

import { substitute } from "@lib/mock";

import { ImageService, OpenWeatherService } from "@lib/services";

import { CityComponent } from "./city.component";

describe("CityComponent", () => {
  let classToTest: CityComponent;

  const imageServiceMock = substitute(ImageService);
  const openWeatherServiceMock = substitute(OpenWeatherService);

  const serviceMockList: any[] = [
    imageServiceMock,
    openWeatherServiceMock
  ];

  beforeEach(() => {
    imageServiceMock.cityPictureUrl.and.returnValue(of(null));
    openWeatherServiceMock.city.and.returnValue(of(null));

    TestBed.configureTestingModule({
      declarations: [
        CityComponent
      ],
      providers: [
        { provide: ImageService, useValue: imageServiceMock },
        { provide: OpenWeatherService, useValue: openWeatherServiceMock }
      ]
    }).overrideTemplate(CityComponent, "<div></div>").compileComponents();

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
