/*eslint-disable @typescript-eslint/camelcase */

import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed, async } from "@angular/core/testing";
import { combineReducers, Store, StoreModule } from "@ngrx/store";
import { of } from "rxjs";

import { UvIndex } from "@lib/models";
import { uvIndexReducer } from "@lib/store/uv-index-store";
import { RootState } from "@lib/store/root-state";
import { UvIndexComponent } from "./uv-index.component";

describe("UvIndexComponent", () => {
  let component: UvIndexComponent;
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
      .mockReturnValueOnce(of(false))
      .mockReturnValueOnce(of({
        lat: 38.75,
        lon: 40.25,
        date_iso: "2017-06-23T12:00:00Z",
        date: 1498219200,
        value: 10.16
      }));

    const fixture = TestBed.createComponent(UvIndexComponent);
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

    test("uvIndex$", done => {
      // Arrange 
      component.ngOnInit();

      // Act
      component.uvIndex$
        .subscribe({
          next: (uvIndex: UvIndex) => {
            // Assert
            expect(uvIndex).toMatchSnapshot({
              lat: 38.75,
              lon: 40.25,
              date_iso: "2017-06-23T12:00:00Z",
              date: 1498219200,
              value: 10.16
            });
          },
          complete: () => done()
        });
    });
  });
});
