import { NO_ERRORS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { combineReducers, Store, StoreModule } from "@ngrx/store";
import { of } from "rxjs";

import { City } from "@lib/models";
import { cityReducer } from "@lib/store/city-store";
import { imageReducer } from "@lib/store/image-store";
import { RootState } from "@lib/store/root-state";
import { CityComponent } from "./city.component";

describe("CityComponent", () => {
  let component: CityComponent;
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
      .mockReturnValueOnce(of("https://api.unsplash.com/search/photos?client_id=CLIENT_ID&orientation=ORIENTATION&query=QUERY"))
      .mockReturnValueOnce(of({
        id: 0,
        name: "Nuremberg",
        country: "DE",
        population: 518365,
        coord: {
          lon: 11.061859,
          lat: 49.460983
        }
      }))
      .mockReturnValueOnce(of(false));

    const fixture: ComponentFixture<CityComponent> = TestBed.createComponent(CityComponent);
    component = fixture.debugElement.componentInstance;
  });

  test("should create the app", async(() => {
    // Assert
    expect(component).toBeTruthy();
  }));

  describe("ngOnInit", () => {
    test("cityPictureUrl$", done => {
      // Arrange 
      component.ngOnInit();

      // Act
      component.cityPictureUrl$
        .subscribe({
          next: (url: string) => {
            // Assert
            expect(url).toBe("https://api.unsplash.com/search/photos?client_id=CLIENT_ID&orientation=ORIENTATION&query=QUERY");
          },
          complete: () => done()
        });
    });

    test("city$", done => {
      // Arrange 
      component.ngOnInit();

      // Act
      component.city$
        .subscribe({
          next: (city: City) => {
            // Assert
            expect(city).toMatchSnapshot({
              id: 0,
              name: "Nuremberg",
              country: "DE",
              population: 518365,
              coord: {
                lon: 11.061859,
                lat: 49.460983
              }
            });
          },
          complete: () => done()
        });
    });

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
  });
});
