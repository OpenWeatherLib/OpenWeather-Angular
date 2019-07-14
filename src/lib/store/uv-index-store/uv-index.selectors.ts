import { createFeatureSelector, createSelector, MemoizedSelector } from "@ngrx/store";
import { UvIndex } from "@lib/models";
import { UvIndexState } from "./uv-index.state";

export const selectorKey: string = "uv-index";

export const uvIndex = (state: UvIndexState): UvIndex => state.uvIndex;
export const isLoading = (state: UvIndexState): boolean => state.isLoading;
export const error = (state: UvIndexState): any => state.error;

export const selectUvIndexState: MemoizedSelector<object, UvIndexState> = createFeatureSelector<UvIndexState>(selectorKey);

export const selectUvIndex: MemoizedSelector<object, UvIndex> = createSelector(selectUvIndexState, uvIndex);
export const selectIsLoading: MemoizedSelector<object, boolean> = createSelector(selectUvIndexState, isLoading);
export const selectError: MemoizedSelector<object, string> = createSelector(selectUvIndexState, error);
