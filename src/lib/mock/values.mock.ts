import { City, GeoLocation } from "../models";

export default class MockValues {
    static geoLocation(): GeoLocation {
        const geoLocation = new GeoLocation()
        geoLocation.lat = 45.3452;
        geoLocation.long = 23.543;
        return geoLocation;
    }

    static city(): City {
        const city = new City();
        city.id = 420;
        city.name = "Nuremberg";
        city.country = "DE";
        city.population = 499523;
        city.geoLocation = this.geoLocation();
        return city;
    }
}