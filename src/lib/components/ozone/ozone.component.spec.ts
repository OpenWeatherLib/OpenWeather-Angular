import { TestBed, async } from "@angular/core/testing";
import { of } from "rxjs";

import MockServices from "@lib/mock/services.mock";
// import MockValues from "@lib/mock/values.mock";

import { OpenWeatherService } from "@lib/services";

import { OzoneComponent } from "./ozone.component";

describe("OzoneComponent", () => {
  let classToTest: OzoneComponent;

  const openWeatherServiceMock = MockServices.substitute(OpenWeatherService);

  const serviceMockList: any[] = [
    openWeatherServiceMock
  ];

  beforeEach(() => {
    openWeatherServiceMock.ozone.and.returnValue(of(null));

    TestBed.configureTestingModule({
      declarations: [
        OzoneComponent
      ],
      providers: [
        { provide: OpenWeatherService, useValue: openWeatherServiceMock }
      ]
    }).overrideTemplate(OzoneComponent, "<div></div>").compileComponents();

    const fixture = TestBed.createComponent(OzoneComponent);
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
