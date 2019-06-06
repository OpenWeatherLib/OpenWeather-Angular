import { TestBed, async } from "@angular/core/testing";

// import MockServices from "@lib/mock/services.mock";
// import MockValues from "@lib/mock/values.mock";

import { BaseComponent } from "./base.component";

describe("BaseComponent", () => {
  let classToTest: BaseComponent;

  const serviceMockList: any[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BaseComponent
      ]
    });

    classToTest = new BaseComponent();
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
