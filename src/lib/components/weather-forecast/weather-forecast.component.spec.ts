import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { combineReducers, Store, StoreModule } from "@ngrx/store";
import { of } from "rxjs";

import { weatherForecastReducer, setFilterRequestAction } from "@lib/store/weather-forecast-store";
import { RootState } from "@lib/store/root-state";
import { WeatherForecastComponent } from "./weather-forecast.component";

describe("WeatherForecastComponent", () => {
  let classToTest: WeatherForecastComponent;
  let store$: Store<RootState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        WeatherForecastComponent
      ],
      imports: [
        StoreModule.forRoot({ weatherForecast: combineReducers(weatherForecastReducer) })
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    store$ = TestBed.get(Store);
    store$.dispatch = jest.fn();
    store$.select = jest.fn()
      .mockReturnValueOnce(() => of(false))
      .mockReturnValueOnce(() => of(undefined))
      .mockReturnValueOnce(() => of([]));

    const fixture = TestBed.createComponent(WeatherForecastComponent);
    classToTest = fixture.debugElement.componentInstance;
  });

  test("should create the app", () => {
    // Assert
    expect(classToTest).toBeTruthy();
  });

  describe("filterWeatherForecast", () => {
    test("should dispatch action", () => {
      // Arrange
      classToTest.weatherForecastSearch = "Filter";

      // Act
      classToTest.filterWeatherForecast();

      // Assert
      expect(store$.dispatch).toHaveBeenCalledTimes(1);
      expect(store$.dispatch).toHaveBeenCalledWith(setFilterRequestAction({ filter: "Filter" }));
    });
  });

  describe("trackByIndex", () => {
    test("should return expected value", () => {
      // Arrange & Act
      const actual = classToTest.trackByIndex(42, undefined);

      // Assert
      expect(actual).toBe(42);
    });
  });
});
