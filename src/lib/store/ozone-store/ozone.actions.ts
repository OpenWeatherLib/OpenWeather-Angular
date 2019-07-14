import { createAction, props } from "@ngrx/store";

import { City, Ozone } from "@lib/models";

export const loadOzoneRequestAction = createAction(
    "[Ozone Api] Request",
    props<{ city: City }>()
);

export const loadOzoneSuccessAction = createAction(
    "[Ozone Api] Success",
    props<{ ozone: Ozone }>()
);

export const loadOzoneErrorAction = createAction(
    "[Ozone Api] Error",
    props<{ error: any }>()
);

export const setAccuracy = createAction(
    "[Ozone Api] Set Accuracy",
    props<{ accuracy: number }>()
);

export const setDateTime = createAction(
    "[Ozone Api] Set DateTime",
    props<{ dateTime: string }>()
);
