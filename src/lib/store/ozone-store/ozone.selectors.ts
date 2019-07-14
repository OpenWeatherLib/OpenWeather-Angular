import { createFeatureSelector, createSelector, MemoizedSelector } from "@ngrx/store";
import { Ozone } from "@lib/models";
import { OzoneState } from "./ozone.state";

export const selectorKey: string = "ozone";

export const ozone = (state: OzoneState): Ozone => state.ozone;
export const dateTime = (state: OzoneState): string => state.dateTime;
export const accuracy = (state: OzoneState): number => state.accuracy;
export const isLoading = (state: OzoneState): boolean => state.isLoading;
export const error = (state: OzoneState): any => state.error;

export const selectOzoneState: MemoizedSelector<object, OzoneState> = createFeatureSelector<OzoneState>(selectorKey);

export const selectOzone: MemoizedSelector<object, Ozone> = createSelector(selectOzoneState, ozone);
export const selectDateTime: MemoizedSelector<object, string> = createSelector(selectOzoneState, dateTime);
export const selectAccuracy: MemoizedSelector<object, number> = createSelector(selectOzoneState, accuracy);
export const selectIsLoading: MemoizedSelector<object, boolean> = createSelector(selectOzoneState, isLoading);
export const selectError: MemoizedSelector<object, string> = createSelector(selectOzoneState, error);
