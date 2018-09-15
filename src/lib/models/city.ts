import { classJsonKey } from "@lib/decorator";
import { Coordinates } from "@lib/models/coordinates";

@classJsonKey("", "")
export class City {
  id: number = 0;
  name: string = "";
  country: string = "";
  population: number = 0;
  coord: Coordinates = { lat: 720.0, lon: 720.0 };

  isDefault(): boolean {
    return this.id === 0 && this.name === "" && this.country === "" && this.population === 0 && this.coord.lat === 720.0 && this.coord.lon === 720.0;
  }
}
