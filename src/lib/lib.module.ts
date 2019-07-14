import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { CityComponent, OzoneComponent, UvIndexComponent, WeatherCurrentComponent, WeatherForecastComponent } from "@lib/components";
import { ApiInterceptor } from "@lib/interceptor/api.interceptor";
import { ApiService, CityService, ImageService, OpenWeatherService } from "@lib/services";
import { CarbonMonoxideStoreEffects, carbonMonoxideReducer, selectorKey as carbonMonoxideSelectorKey } from "@lib/store/carbon-monoxide-store";
import { CityStoreEffects, cityReducer, selectorKey as citySelectorKey } from "@lib/store/city-store";
import { ImageStoreEffects, imageReducer, selectorKey as imageSelectorKey } from "@lib/store/image-store";
import { NitrogenDioxideStoreEffects, nitrogenDioxideReducer, selectorKey as nitrogenDioxideSelectorKey } from "@lib/store/nitrogen-dioxide-store";
import { OzoneStoreEffects, ozoneReducer, selectorKey as ozoneSelectorKey } from "@lib/store/ozone-store";
import { SulfurDioxideStoreEffects, sulfurDioxideReducer, selectorKey as sulfurDioxideSelectorKey } from "@lib/store/sulfur-dioxide-store";
import { UvIndexStoreEffects, uvIndexReducer, selectorKey as uvIndexSelectorKey } from "@lib/store/uv-index-store";
import { WeatherCurrentStoreEffects, weatherCurrentReducer, selectorKey as weatherCurrentSelectorKey } from "@lib/store/weather-current-store";
import { WeatherForecastStoreEffects, weatherForecastReducer, selectorKey as weatherForecastSelectorKey } from "@lib/store/weather-forecast-store";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatProgressBarModule,
        MatSidenavModule,
        MatToolbarModule,

        EffectsModule.forFeature([
            CarbonMonoxideStoreEffects,
            CityStoreEffects,
            ImageStoreEffects,
            NitrogenDioxideStoreEffects,
            OzoneStoreEffects,
            SulfurDioxideStoreEffects,
            UvIndexStoreEffects,
            WeatherCurrentStoreEffects,
            WeatherForecastStoreEffects
        ]),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
        }),
        StoreModule.forFeature(carbonMonoxideSelectorKey, carbonMonoxideReducer),
        StoreModule.forFeature(citySelectorKey, cityReducer),
        StoreModule.forFeature(imageSelectorKey, imageReducer),
        StoreModule.forFeature(nitrogenDioxideSelectorKey, nitrogenDioxideReducer),
        StoreModule.forFeature(ozoneSelectorKey, ozoneReducer),
        StoreModule.forFeature(sulfurDioxideSelectorKey, sulfurDioxideReducer),
        StoreModule.forFeature(uvIndexSelectorKey, uvIndexReducer),
        StoreModule.forFeature(weatherCurrentSelectorKey, weatherCurrentReducer),
        StoreModule.forFeature(weatherForecastSelectorKey, weatherForecastReducer),
        StoreModule.forRoot({}, {
            runtimeChecks: {
                strictStateImmutability: false,
                strictActionImmutability: false,
                strictStateSerializability: false,
                strictActionSerializability: false,
            }
        })
    ],
    exports: [
        CityComponent,
        OzoneComponent,
        UvIndexComponent,
        WeatherCurrentComponent,
        WeatherForecastComponent
    ],
    declarations: [
        CityComponent,
        OzoneComponent,
        UvIndexComponent,
        WeatherCurrentComponent,
        WeatherForecastComponent
    ],
    providers: [
        ApiService,
        CarbonMonoxideStoreEffects,
        CityService,
        CityStoreEffects,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiInterceptor,
            multi: true
        },
        ImageService,
        ImageStoreEffects,
        NitrogenDioxideStoreEffects,
        OpenWeatherService,
        OzoneStoreEffects,
        SulfurDioxideStoreEffects,
        UvIndexStoreEffects,
        WeatherCurrentStoreEffects,
        WeatherForecastStoreEffects
    ],
    entryComponents: [
        CityComponent,
        OzoneComponent,
        UvIndexComponent,
        WeatherCurrentComponent,
        WeatherForecastComponent
    ]
})
export class LibModule { }
