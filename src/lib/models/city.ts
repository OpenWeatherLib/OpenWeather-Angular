import { classJsonKey } from "@lib/decorator";

@classJsonKey("", "")
export class City {
  id: number = 0;
  name: string = "";
  country: string = "";
  population: number = 0;
  lat: number = 720.0;
  long: number = 720.0;

  isDefault(): boolean {
    return this.id === 0 && this.name === "" && this.country === "" && this.population === 0 && this.lat === 720.0 && this.long === 720.0;
  }
}
