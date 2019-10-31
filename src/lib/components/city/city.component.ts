import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { City } from "@lib/models";
import { selectCity } from "@lib/store/city-store";
import { selectIsLoading, selectUrl } from "@lib/store/image-store";
import { RootState } from "@lib/store/root-state";

@Component({
  selector: "ga-city",
  templateUrl: "./city.component.html",
  styleUrls: ["./city.component.scss"]
})
export class CityComponent implements OnInit {

  city$: Observable<City>;

  cityPictureUrl$: Observable<string>;

  isLoading$: Observable<boolean>;

  constructor(private readonly store$: Store<RootState>) { }

  ngOnInit(): void {
    this.cityPictureUrl$ = this.store$.select(selectUrl);

    this.city$ = this.store$.select(selectCity);

    this.isLoading$ = this.store$.select(selectIsLoading);
  }
}
