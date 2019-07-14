import { createAction, props } from "@ngrx/store";

export const loadImageUrlSuccessAction = createAction(
    "[Image Url Api] Success",
    props<{ url: string }>()
);

export const loadImageUrlErrorAction = createAction(
    "[Image Url Api] Error",
    props<{ error: any }>()
);
