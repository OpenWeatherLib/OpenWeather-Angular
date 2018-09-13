import { GeoLocation } from "./geo-location";

export class UvIndex {
  geoLocation: GeoLocation = new GeoLocation();
  date: Date = new Date();
  value: number = 0.0;

  isDefault(): boolean {
    return this.geoLocation.isDefault() && this.value === 0.0;
  }
}
