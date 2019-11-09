import { NO_ERRORS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { combineReducers, Store, StoreModule } from "@ngrx/store";
import { of } from "rxjs";

import { WeatherCurrent } from "@lib/models";
import { weatherCurrentReducer } from "@lib/store/weather-current-store";
import { RootState } from "@lib/store/root-state";
import { WeatherCurrentComponent } from "./weather-current.component";

describe("WeatherCurrentComponent", () => {
  let component: WeatherCurrentComponent;
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
      .mockReturnValueOnce(of(false))
      .mockReturnValueOnce(of({
        coord: undefined,
        weather: [],
        base: "",
        main: undefined,
        visibility: 10,
        wind: undefined,
        clouds: undefined,
        dt: 0,
        sys: undefined,
        id: 0,
        name: "Name",
        cod: 0,
        weatherCondition: undefined
      }));

    const fixture: ComponentFixture<WeatherCurrentComponent> = TestBed.createComponent(WeatherCurrentComponent);
    component = fixture.debugElement.componentInstance;
  });

  test("should create the app", async(() => {
    // Assert
    expect(component).toBeTruthy();
  }));

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

    test("weatherCurrent$", done => {
      // Arrange 
      component.ngOnInit();

      // Act
      component.weatherCurrent$
        .subscribe({
          next: (weatherCurrent: WeatherCurrent) => {
            // Assert
            expect(weatherCurrent).toMatchSnapshot({
              coord: undefined,
              weather: [],
              base: "",
              main: undefined,
              visibility: 10,
              wind: undefined,
              clouds: undefined,
              dt: 0,
              sys: undefined,
              id: 0,
              name: "Name",
              cod: 0,
              weatherCondition: undefined
            });
          },
          complete: () => done()
        });
    });
  });
});
