import { Component, OnInit } from "@angular/core";

import { BaseComponent } from "@lib/components/base-component/base.component";
import { UvIndex } from "@lib/models";
import { OpenWeatherService } from "@lib/services";

@Component({
  selector: "ga-uv-index",
  templateUrl: "./uv-index.component.html",
  styleUrls: ["./uv-index.component.scss"]
})
export class UvIndexComponent extends BaseComponent implements OnInit {

  uvIndex: UvIndex = null;

  constructor(private readonly openWeatherService: OpenWeatherService) {
    super();
  }

  ngOnInit() {
    this.registerSubscription(this.openWeatherService.uvIndex().subscribe(uvIndex => {
      if (uvIndex) {
        this.uvIndex = uvIndex;
      }
    }));
  }
}
