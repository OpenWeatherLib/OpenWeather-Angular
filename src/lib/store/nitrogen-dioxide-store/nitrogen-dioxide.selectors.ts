import { createFeatureSelector, createSelector, MemoizedSelector } from "@ngrx/store";
import { NitrogenDioxide } from "@lib/models";
import { NitrogenDioxideState } from "./nitrogen-dioxide.state";

export const selectorKey: string = "nitrogen-dioxide";

export const nitrogenDioxide = (state: NitrogenDioxideState): NitrogenDioxide => state.nitrogenDioxide;
export const dateTime = (state: NitrogenDioxideState): string => state.dateTime;
export const accuracy = (state: NitrogenDioxideState): number => state.accuracy;
export const isLoading = (state: NitrogenDioxideState): boolean => state.isLoading;
export const error = (state: NitrogenDioxideState): any => state.error;

export const selectNitrogenDioxideState: MemoizedSelector<object, NitrogenDioxideState> = createFeatureSelector<NitrogenDioxideState>(selectorKey);

export const selectNitrogenDioxide: MemoizedSelector<object, NitrogenDioxide> = createSelector(selectNitrogenDioxideState, nitrogenDioxide);
export const selectDateTime: MemoizedSelector<object, string> = createSelector(selectNitrogenDioxideState, dateTime);
export const selectAccuracy: MemoizedSelector<object, number> = createSelector(selectNitrogenDioxideState, accuracy);
export const selectIsLoading: MemoizedSelector<object, boolean> = createSelector(selectNitrogenDioxideState, isLoading);
export const selectError: MemoizedSelector<object, string> = createSelector(selectNitrogenDioxideState, error);
