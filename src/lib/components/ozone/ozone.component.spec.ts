import { NO_ERRORS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { combineReducers, Store, StoreModule } from "@ngrx/store";
import { of } from "rxjs";

import { Ozone } from "@lib/models";
import { ozoneReducer } from "@lib/store/ozone-store";
import { RootState } from "@lib/store/root-state";
import { OzoneComponent } from "./ozone.component";

describe("OzoneComponent", () => {
  let component: OzoneComponent;
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
      .mockReturnValueOnce(of(false))
      .mockReturnValueOnce(of({
        dateTime: new Date("2016-03-03T12:00:00Z"),
        coordinates: {
          latitude: 0.0,
          longitude: 10.0
        },
        data: 259.3334655761719
      }));

    const fixture: ComponentFixture<OzoneComponent> = TestBed.createComponent(OzoneComponent);
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

    test("ozone$", done => {
      // Arrange 
      component.ngOnInit();

      // Act
      component.ozone$
        .subscribe({
          next: (ozone: Ozone) => {
            // Assert
            expect(ozone).toMatchSnapshot({
              dateTime: new Date("2016-03-03T12:00:00Z"),
              coordinates: {
                latitude: 0.0,
                longitude: 10.0
              },
              data: 259.3334655761719
            });
          },
          complete: () => done()
        });
    });
  });
});
