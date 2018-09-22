import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { ApiInterceptor } from "@lib/interceptor/api.interceptor";
import { ApiService, ImageService, OpenWeatherService } from "@lib/services";

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    exports: [],
    declarations: [],
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
    entryComponents: []
})
export class LibModule { }
