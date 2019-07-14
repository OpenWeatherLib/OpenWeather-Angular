import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { combineReducers, Store, StoreModule } from "@ngrx/store";
import { of } from "rxjs";

import { loadCityRequestAction } from "@lib/store/city-store";
import { imageReducer } from "@lib/store/image-store";
import { loadOzoneRequestAction } from "@lib/store/ozone-store";
import { RootState } from "@lib/store/root-state";
import { loadUvIndexRequestAction } from "@lib/store/uv-index-store";
import { loadWeatherCurrentRequestAction } from "@lib/store/weather-current-store";
import { loadWeatherForecastRequestAction } from "@lib/store/weather-forecast-store";
import { AppComponent } from "./app.component";

describe("AppComponent", () => {
  let classToTest: AppComponent;
  let store$: Store<RootState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        StoreModule.forRoot({ image: combineReducers(imageReducer) })
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    classToTest = fixture.debugElement.componentInstance;
  });

  store$ = TestBed.get(Store);
  store$.dispatch = jest.fn();
  store$.select = jest.fn()
    .mockReturnValueOnce(() => of(undefined))
    .mockReturnValueOnce(() => of(false))
    .mockReturnValueOnce(() => of(false))
    .mockReturnValueOnce(() => of(false))
    .mockReturnValueOnce(() => of(false))
    .mockReturnValueOnce(() => of(false));

  test("should create the app", () => {
    // Assert
    expect(classToTest).toBeTruthy();
  });

  describe("loadOzone", () => {
    test("should dispatch", () => {
      // Arrange & Act
      classToTest.loadOzone();

      // Assert
      expect(store$.dispatch).toHaveBeenCalledTimes(1);
      expect(store$.dispatch).toHaveBeenCalledWith(loadOzoneRequestAction({ city: undefined }));
    });
  });

  describe("loadUvIndex", () => {
    test("should dispatch", () => {
      // Arrange & Act
      classToTest.loadUvIndex();

      // Assert
      expect(store$.dispatch).toHaveBeenCalledTimes(1);
      expect(store$.dispatch).toHaveBeenCalledWith(loadUvIndexRequestAction({ city: undefined }));
    });
  });

  describe("loadWeatherCurrent", () => {
    test("should dispatch", () => {
      // Arrange & Act
      classToTest.loadWeatherCurrent();

      // Assert
      expect(store$.dispatch).toHaveBeenCalledTimes(1);
      expect(store$.dispatch).toHaveBeenCalledWith(loadWeatherCurrentRequestAction({ city: undefined }));
    });
  });

  describe("loadWeatherForecast", () => {
    test("should dispatch", () => {
      // Arrange & Act
      classToTest.loadWeatherForecast();

      // Assert
      expect(store$.dispatch).toHaveBeenCalledTimes(1);
      expect(store$.dispatch).toHaveBeenCalledWith(loadWeatherForecastRequestAction({ city: undefined }));
    });
  });

  describe("updateCity", () => {
    test("should dispatch", () => {
      // Arrange
      classToTest.newCityName = "Munich";

      // Act
      classToTest.updateCity();

      // Assert
      expect(store$.dispatch).toHaveBeenCalledTimes(1);
      expect(store$.dispatch).toHaveBeenCalledWith(loadCityRequestAction({ cityName: "Munich" }));
    });
  });
});
