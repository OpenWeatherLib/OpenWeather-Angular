import { Component, OnInit } from "@angular/core";

import { BaseComponent } from "@lib/components/base-component/base.component";
import { Ozone } from "@lib/models";
import { OpenWeatherService } from "@lib/services";

@Component({
  selector: "ga-ozone",
  templateUrl: "./ozone.component.html",
  styleUrls: ["./ozone.component.scss"]
})
export class OzoneComponent extends BaseComponent implements OnInit {

  ozone: Ozone = null;

  constructor(private readonly openWeatherService: OpenWeatherService) {
    super();
  }

  ngOnInit() {
    this.registerSubscription(this.openWeatherService.ozone().subscribe(ozone => {
      if (ozone) {
        this.ozone = ozone;
      }
    }));
  }
}
