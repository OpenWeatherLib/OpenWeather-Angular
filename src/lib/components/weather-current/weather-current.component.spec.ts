import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed, async } from "@angular/core/testing";
import { combineReducers, Store, StoreModule } from "@ngrx/store";
import { of } from "rxjs";

import { weatherCurrentReducer } from "@lib/store/weather-current-store";
import { RootState } from "@lib/store/root-state";
import { WeatherCurrentComponent } from "./weather-current.component";

describe("WeatherCurrentComponent", () => {
  let classToTest: WeatherCurrentComponent;
  let store$: Store<RootState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        WeatherCurrentComponent
      ],
      imports: [
        StoreModule.forRoot({ weatherCurrent: combineReducers(weatherCurrentReducer) })
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    store$ = TestBed.get(Store);
    store$.select = jest.fn()
      .mockReturnValueOnce(() => of(false))
      .mockReturnValueOnce(() => of(undefined));

    const fixture = TestBed.createComponent(WeatherCurrentComponent);
    classToTest = fixture.debugElement.componentInstance;
  });

  test("should create the app", async(() => {
    // Assert
    expect(classToTest).toBeTruthy();
  }));
});
