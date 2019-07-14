import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { UvIndex } from "@lib/models";
import { selectIsLoading, selectUvIndex } from "@lib/store/uv-index-store";
import { RootState } from "@lib/store/root-state";

@Component({
  selector: "ga-uv-index",
  templateUrl: "./uv-index.component.html",
  styleUrls: ["./uv-index.component.scss"]
})
export class UvIndexComponent implements OnInit {

  isLoading$: Observable<boolean>;

  uvIndex$: Observable<UvIndex>;

  constructor(private readonly store$: Store<RootState>) { }

  ngOnInit() {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.uvIndex$ = this.store$.select(selectUvIndex);
  }
}
