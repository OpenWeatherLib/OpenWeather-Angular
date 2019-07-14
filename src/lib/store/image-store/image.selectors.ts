import { createFeatureSelector, createSelector, MemoizedSelector } from "@ngrx/store";
import { ImageState } from "./image.state";

export const selectorKey: string = "image";

export const url = (state: ImageState): string => state.url;
export const isLoading = (state: ImageState): boolean => state.isLoading;
export const error = (state: ImageState): any => state.error;

export const selectImageState: MemoizedSelector<object, ImageState> = createFeatureSelector<ImageState>(selectorKey);

export const selectUrl: MemoizedSelector<object, string> = createSelector(selectImageState, url);
export const selectIsLoading: MemoizedSelector<object, boolean> = createSelector(selectImageState, isLoading);
export const selectError: MemoizedSelector<object, string> = createSelector(selectImageState, error);
