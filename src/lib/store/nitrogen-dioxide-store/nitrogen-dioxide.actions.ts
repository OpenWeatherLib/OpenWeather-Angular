import { createAction, props } from "@ngrx/store";

import { City, NitrogenDioxide } from "@lib/models";

export const loadNitrogenDioxideRequestAction = createAction(
    "[NitrogenDioxide Api] Request",
    props<{ city: City }>()
);

export const loadNitrogenDioxideSuccessAction = createAction(
    "[NitrogenDioxide Api] Success",
    props<{ nitrogenDioxide: NitrogenDioxide }>()
);

export const loadNitrogenDioxideErrorAction = createAction(
    "[NitrogenDioxide Api] Error",
    props<{ error: any }>()
);

export const setAccuracy = createAction(
    "[NitrogenDioxide Api] Set Accuracy",
    props<{ accuracy: number }>()
);

export const setDateTime = createAction(
    "[NitrogenDioxide Api] Set DateTime",
    props<{ dateTime: string }>()
);
