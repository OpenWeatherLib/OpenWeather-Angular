import { Component, Input, OnInit } from "@angular/core";

import { BaseComponent } from "@lib/components/base-component/base.component";
import { City } from "@lib/models";
import { ImageService, OpenWeatherService } from "@lib/services";

@Component({
  selector: "ga-city",
  templateUrl: "./city.component.html",
  styleUrls: ["./city.component.scss"]
})
export class CityComponent extends BaseComponent implements OnInit {

  @Input() initialCityName: string = String().empty;

  city: City = null;
  cityPictureUrl: string = String().empty;

  constructor(private readonly imageService: ImageService,
    private readonly openWeatherService: OpenWeatherService) {
    super();
  }

  ngOnInit() {
    this.openWeatherService.loadCityData(this.initialCityName);

    this.registerSubscription(
      this.openWeatherService.city()
        .subscribe(city => {
          if (city) {
            this.city = city;
            this.imageService.receiveImagePictureUrl(this.city.name);
          }
        }));

    this.registerSubscription(
      this.imageService.cityPictureUrl()
        .subscribe(url => {
          this.cityPictureUrl = url;
        }));
  }
}
