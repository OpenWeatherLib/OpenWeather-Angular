import { createFeatureSelector, createSelector, MemoizedSelector } from "@ngrx/store";
import { CarbonMonoxide } from "@lib/models";
import { CarbonMonoxideState } from "./carbon-monoxide.state";

export const selectorKey: string = "carbon-monoxide";

export const carbonMonoxide = (state: CarbonMonoxideState): CarbonMonoxide => state.carbonMonoxide;
export const dateTime = (state: CarbonMonoxideState): string => state.dateTime;
export const accuracy = (state: CarbonMonoxideState): number => state.accuracy;
export const isLoading = (state: CarbonMonoxideState): boolean => state.isLoading;
export const error = (state: CarbonMonoxideState): any => state.error;

export const selectCarbonMonoxideState: MemoizedSelector<object, CarbonMonoxideState> = createFeatureSelector<CarbonMonoxideState>(selectorKey);

export const selectCarbonMonoxide: MemoizedSelector<object, CarbonMonoxide> = createSelector(selectCarbonMonoxideState, carbonMonoxide);
export const selectDateTime: MemoizedSelector<object, string> = createSelector(selectCarbonMonoxideState, dateTime);
export const selectAccuracy: MemoizedSelector<object, number> = createSelector(selectCarbonMonoxideState, accuracy);
export const selectIsLoading: MemoizedSelector<object, boolean> = createSelector(selectCarbonMonoxideState, isLoading);
export const selectError: MemoizedSelector<object, string> = createSelector(selectCarbonMonoxideState, error);
