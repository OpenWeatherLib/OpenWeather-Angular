import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "@environments/environment";
import { validate, required } from "@lib/decorator";
import { ValidationRequiredType } from "@lib/enums";
import { any, format } from "@lib/helper";
import { City, City2 } from "@lib/models";
import { ApiService } from "@lib/services/api.service";

@Injectable()
export class CityService {

    constructor(private readonly apiService: ApiService) { }

    @validate(of(undefined))
    loadCityData(@required(ValidationRequiredType.String) cityName: string): Observable<City> {
        return this.apiService.get<any>(format(environment.urls.apis.geoCodeForCity, cityName), true)
            .pipe(map((response: any) => {
                if (!!response && !!response.status && response.status === "OK" && any(response.results)) {
                    const city2: City2 = response.results[0];

                    return {
                        id: -1,
                        name: city2.address_components[0].short_name,
                        country: city2.address_components[1].short_name,
                        population: -1,
                        coord: { lat: city2.geometry.location.lat, lon: city2.geometry.location.lng }
                    };
                }

                return undefined;
            }));
    }
}
