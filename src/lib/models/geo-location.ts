import { classJsonKey } from "../decorator";

@classJsonKey("", "")
export class GeoLocation {
  lat: number = 720.0;
  long: number = 720.0;

  isDefault(): boolean {
    return this.lat === 720.0 && this.long === 720.0;
  }
}
