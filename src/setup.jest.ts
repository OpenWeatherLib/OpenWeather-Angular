import "jest-preset-angular";
import "./jestGlobalMocks";

import { registerLocaleData } from "@angular/common";
import localeDe from "@angular/common/locales/de";

registerLocaleData(localeDe);
