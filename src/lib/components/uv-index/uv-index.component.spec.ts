import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed, async } from "@angular/core/testing";
import { combineReducers, Store, StoreModule } from "@ngrx/store";
import { of } from "rxjs";

import { uvIndexReducer } from "@lib/store/uv-index-store";
import { RootState } from "@lib/store/root-state";
import { UvIndexComponent } from "./uv-index.component";

describe("UvIndexComponent", () => {
  let classToTest: UvIndexComponent;
  let store$: Store<RootState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        UvIndexComponent
      ],
      imports: [
        StoreModule.forRoot({ uvIndex: combineReducers(uvIndexReducer) })
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    store$ = TestBed.get(Store);
    store$.select = jest.fn()
      .mockReturnValueOnce(() => of(false))
      .mockReturnValueOnce(() => of(undefined));

    const fixture = TestBed.createComponent(UvIndexComponent);
    classToTest = fixture.debugElement.componentInstance;
  });

  test("should create the app", async(() => {
    // Assert
    expect(classToTest).toBeTruthy();
  }));
});
