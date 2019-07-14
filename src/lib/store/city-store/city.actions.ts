import { createAction, props } from "@ngrx/store";

import { City } from "@lib/models";

export const loadCityRequestAction = createAction(
    "[City Api] Request",
    props<{ cityName: string }>()
);

export const loadCitySuccessAction = createAction(
    "[City Api] Success",
    props<{ city: City }>()
);

export const loadCityErrorAction = createAction(
    "[City Api] Error",
    props<{ error: any }>()
);
