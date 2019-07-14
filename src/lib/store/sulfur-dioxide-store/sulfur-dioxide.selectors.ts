import { createFeatureSelector, createSelector, MemoizedSelector } from "@ngrx/store";
import { SulfurDioxide } from "@lib/models";
import { SulfurDioxideState } from "./sulfur-dioxide.state";

export const selectorKey: string = "sulfur-dioxide";

export const sulfurDioxide = (state: SulfurDioxideState): SulfurDioxide => state.sulfurDioxide;
export const dateTime = (state: SulfurDioxideState): string => state.dateTime;
export const accuracy = (state: SulfurDioxideState): number => state.accuracy;
export const isLoading = (state: SulfurDioxideState): boolean => state.isLoading;
export const error = (state: SulfurDioxideState): any => state.error;

export const selectSulfurDioxideState: MemoizedSelector<object, SulfurDioxideState> = createFeatureSelector<SulfurDioxideState>(selectorKey);

export const selectSulfurDioxide: MemoizedSelector<object, SulfurDioxide> = createSelector(selectSulfurDioxideState, sulfurDioxide);
export const selectDateTime: MemoizedSelector<object, string> = createSelector(selectSulfurDioxideState, dateTime);
export const selectAccuracy: MemoizedSelector<object, number> = createSelector(selectSulfurDioxideState, accuracy);
export const selectIsLoading: MemoizedSelector<object, boolean> = createSelector(selectSulfurDioxideState, isLoading);
export const selectError: MemoizedSelector<object, string> = createSelector(selectSulfurDioxideState, error);
