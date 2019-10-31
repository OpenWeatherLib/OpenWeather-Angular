import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { Ozone } from "@lib/models";
import { selectIsLoading, selectOzone } from "@lib/store/ozone-store";
import { RootState } from "@lib/store/root-state";

@Component({
  selector: "ga-ozone",
  templateUrl: "./ozone.component.html",
  styleUrls: ["./ozone.component.scss"]
})
export class OzoneComponent implements OnInit {

  isLoading$: Observable<boolean>;

  ozone$: Observable<Ozone>;

  constructor(private readonly store$: Store<RootState>) { }

  ngOnInit(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.ozone$ = this.store$.select(selectOzone);
  }
}
