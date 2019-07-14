import { City } from "@lib/models";
import { isNullOrEmpty } from "./string-helper";

export const isCoordSet = (city: City): boolean => !!city && !!city.coord && city.coord.lat !== 720.0 && city.coord.lon !== 720.0;

export const isNameSet = (city: City): boolean => !!city && !isNullOrEmpty(city.name);
