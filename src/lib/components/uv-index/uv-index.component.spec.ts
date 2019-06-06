import { TestBed, async } from "@angular/core/testing";
import { of } from "rxjs";

import { substitute } from "@lib/mock";

import { OpenWeatherService } from "@lib/services";

import { UvIndexComponent } from "./uv-index.component";

describe("UvIndexComponent", () => {
  let classToTest: UvIndexComponent;

  const openWeatherServiceMock = substitute(OpenWeatherService);

  const serviceMockList: any[] = [
    openWeatherServiceMock
  ];

  beforeEach(() => {
    openWeatherServiceMock.uvIndex.and.returnValue(of(null));

    TestBed.configureTestingModule({
      declarations: [
        UvIndexComponent
      ],
      providers: [
        { provide: OpenWeatherService, useValue: openWeatherServiceMock }
      ]
    }).overrideTemplate(UvIndexComponent, "<div></div>").compileComponents();

    const fixture = TestBed.createComponent(UvIndexComponent);
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
