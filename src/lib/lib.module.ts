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
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";

import { CityComponent, OzoneComponent, UvIndexComponent, WeatherCurrentComponent, WeatherForecasstComponent } from "@lib/components";
import { ApiInterceptor } from "@lib/interceptor/api.interceptor";
import { ApiService, ImageService, OpenWeatherService } from "@lib/services";

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
        MatSidenavModule,
        MatToolbarModule
    ],
    exports: [
        CityComponent,
        OzoneComponent,
        UvIndexComponent,
        WeatherCurrentComponent,
        WeatherForecasstComponent
    ],
    declarations: [
        CityComponent,
        OzoneComponent,
        UvIndexComponent,
        WeatherCurrentComponent,
        WeatherForecasstComponent
    ],
    providers: [
        ApiService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiInterceptor,
            multi: true
        },
        ImageService,
        OpenWeatherService
    ],
    entryComponents: [
        CityComponent,
        OzoneComponent,
        UvIndexComponent,
        WeatherCurrentComponent,
        WeatherForecasstComponent
    ]
})
export class LibModule { }
