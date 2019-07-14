import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed, async } from "@angular/core/testing";
import { combineReducers, Store, StoreModule } from "@ngrx/store";
import { of } from "rxjs";

import { cityReducer } from "@lib/store/city-store";
import { imageReducer } from "@lib/store/image-store";
import { RootState } from "@lib/store/root-state";
import { CityComponent } from "./city.component";

describe("CityComponent", () => {
  let classToTest: CityComponent;
  let store$: Store<RootState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CityComponent
      ],
      imports: [
        StoreModule.forRoot({ image: combineReducers(imageReducer), city: combineReducers(cityReducer) })
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    store$ = TestBed.get(Store);
    store$.select = jest.fn()
      .mockReturnValueOnce(() => of(undefined))
      .mockReturnValueOnce(() => of(undefined))
      .mockReturnValueOnce(() => of(false));

    const fixture = TestBed.createComponent(CityComponent);
    classToTest = fixture.debugElement.componentInstance;
  });

  test("should create the app", async(() => {
    // Assert
    expect(classToTest).toBeTruthy();
  }));
});
