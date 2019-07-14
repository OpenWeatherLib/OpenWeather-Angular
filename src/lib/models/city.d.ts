import { Coordinates } from "@lib/models/coordinates";

export interface City {
  id: number;
  name: string;
  country: string;
  population: number;
  coord: Coordinates;
}
