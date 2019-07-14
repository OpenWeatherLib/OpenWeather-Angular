import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed, async } from "@angular/core/testing";
import { combineReducers, Store, StoreModule } from "@ngrx/store";
import { of } from "rxjs";

import { ozoneReducer } from "@lib/store/ozone-store";
import { RootState } from "@lib/store/root-state";
import { OzoneComponent } from "./ozone.component";

describe("OzoneComponent", () => {
  let classToTest: OzoneComponent;
  let store$: Store<RootState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        OzoneComponent
      ],
      imports: [
        StoreModule.forRoot({ ozone: combineReducers(ozoneReducer) })
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    store$ = TestBed.get(Store);
    store$.select = jest.fn()
      .mockReturnValueOnce(() => of(false))
      .mockReturnValueOnce(() => of(undefined));

    const fixture = TestBed.createComponent(OzoneComponent);
    classToTest = fixture.debugElement.componentInstance;
  });

  test("should create the app", async(() => {
    // Assert
    expect(classToTest).toBeTruthy();
  }));
});
