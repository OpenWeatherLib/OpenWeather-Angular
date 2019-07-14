import { createAction, props } from "@ngrx/store";

import { City, CarbonMonoxide } from "@lib/models";

export const loadCarbonMonoxideRequestAction = createAction(
    "[CarbonMonoxide Api] Request",
    props<{ city: City }>()
);

export const loadCarbonMonoxideSuccessAction = createAction(
    "[CarbonMonoxide Api] Success",
    props<{ carbonMonoxide: CarbonMonoxide }>()
);

export const loadCarbonMonoxideErrorAction = createAction(
    "[CarbonMonoxide Api] Error",
    props<{ error: any }>()
);

export const setAccuracy = createAction(
    "[CarbonMonoxide Api] Set Accuracy",
    props<{ accuracy: number }>()
);

export const setDateTime = createAction(
    "[CarbonMonoxide Api] Set DateTime",
    props<{ dateTime: string }>()
);
