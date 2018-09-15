import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { ApiService } from "./services";

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    exports: [],
    declarations: [],
    providers: [
        ApiService
    ],
    entryComponents: []
})
export class LibModule { }
