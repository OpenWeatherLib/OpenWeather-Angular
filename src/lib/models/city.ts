import { classJsonKey } from "@lib/decorator";
import { Coordinates } from "@lib/models/coordinates";

@classJsonKey(String().empty, String().empty)
export class City {
  id: number = 0;
  name: string = String().empty;
  country: string = String().empty;
  population: number = 0;
  coord: Coordinates = { lat: 720.0, lon: 720.0 };

  isCoordSet(): boolean { return this.coord.lat !== 720.0 && this.coord.lon !== 720.0; }

  isNameSet(): boolean { return !this.name.isNullOrEmpty(); }
}
