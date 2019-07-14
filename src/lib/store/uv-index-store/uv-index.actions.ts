import { createAction, props } from "@ngrx/store";

import { City, UvIndex } from "@lib/models";

export const loadUvIndexRequestAction = createAction(
    "[UvIndex Api] Request",
    props<{ city: City }>()
);

export const loadUvIndexSuccessAction = createAction(
    "[UvIndex Api] Success",
    props<{ uvIndex: UvIndex }>()
);

export const loadUvIndexErrorAction = createAction(
    "[UvIndex Api] Error",
    props<{ error: any }>()
);
