import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { combineReducers, Store, StoreModule } from "@ngrx/store";
import { of } from "rxjs";

import WeatherCondition from "@lib/enums/weather-condition.enum";
import { WeatherForecastPart } from "@lib/models";
import { weatherForecastReducer, setFilterRequestAction } from "@lib/store/weather-forecast-store";
import { RootState } from "@lib/store/root-state";
import { WeatherForecastComponent } from "./weather-forecast.component";

describe("WeatherForecastComponent", () => {
  let component: WeatherForecastComponent;
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
      .mockReturnValueOnce(of(false))
      .mockReturnValueOnce(of(WeatherCondition.null))
      .mockReturnValueOnce(of([]));

    const fixture = TestBed.createComponent(WeatherForecastComponent);
    component = fixture.debugElement.componentInstance;
  });

  test("should create the app", () => {
    // Assert
    expect(component).toBeTruthy();
  });

  describe("ngOnInit", () => {
    test("isLoading$", done => {
      // Arrange 
      component.ngOnInit();

      // Act
      component.isLoading$
        .subscribe({
          next: (isLoading: boolean) => {
            // Assert
            expect(isLoading).toBeFalsy();
          },
          complete: () => done()
        });
    });

    test("mostWeatherCondition$", done => {
      // Arrange 
      component.ngOnInit();

      // Act
      component.mostWeatherCondition$
        .subscribe({
          next: (weatherCondition: WeatherCondition) => {
            // Assert
            expect(weatherCondition).toMatchSnapshot({
              id: 0,
              description: "Null",
              wallpaper: "/assets/weather_wallpaper_dummy.png",
              icon: "/assets/weather_dummy.png",
              count: 0
            });
          },
          complete: () => done()
        });
    });

    test("weatherForecastList$", done => {
      // Arrange 
      component.ngOnInit();

      // Act
      component.weatherForecastList$
        .subscribe({
          next: (weatherForecastList: WeatherForecastPart[]) => {
            // Assert
            expect(weatherForecastList).toMatchSnapshot([]);
          },
          complete: () => done()
        });
    });
  });

  describe("filterWeatherForecast", () => {
    test("should dispatch action", () => {
      // Arrange
      component.weatherForecastSearch = "Filter";

      // Act
      component.filterWeatherForecast();

      // Assert
      expect(store$.dispatch).toHaveBeenCalledTimes(1);
      expect(store$.dispatch).toHaveBeenCalledWith(setFilterRequestAction({ filter: "Filter" }));
    });
  });

  describe("trackByIndex", () => {
    test("should return expected value", () => {
      // Arrange & Act
      const actual: number = component.trackByIndex(42, undefined);

      // Assert
      expect(actual).toBe(42);
    });
  });
});
