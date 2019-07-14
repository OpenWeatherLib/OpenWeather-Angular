import { createAction, props } from "@ngrx/store";

import { City, SulfurDioxide } from "@lib/models";

export const loadSulfurDioxideRequestAction = createAction(
    "[SulfurDioxide Api] Request",
    props<{ city: City }>()
);

export const loadSulfurDioxideSuccessAction = createAction(
    "[SulfurDioxide Api] Success",
    props<{ sulfurDioxide: SulfurDioxide }>()
);

export const loadSulfurDioxideErrorAction = createAction(
    "[SulfurDioxide Api] Error",
    props<{ error: any }>()
);

export const setAccuracy = createAction(
    "[SulfurDioxide Api] Set Accuracy",
    props<{ accuracy: number }>()
);

export const setDateTime = createAction(
    "[SulfurDioxide Api] Set DateTime",
    props<{ dateTime: string }>()
);
