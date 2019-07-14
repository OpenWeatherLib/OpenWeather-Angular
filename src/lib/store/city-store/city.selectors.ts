import { createFeatureSelector, createSelector, MemoizedSelector } from "@ngrx/store";
import { City } from "@lib/models";
import { CityState } from "./city.state";

export const selectorKey: string = "city";

export const city = (state: CityState): City => state.city;
export const isLoading = (state: CityState): boolean => state.isLoading;
export const error = (state: CityState): any => state.error;

export const selectCityState: MemoizedSelector<object, CityState> = createFeatureSelector<CityState>(selectorKey);

export const selectCity: MemoizedSelector<object, City> = createSelector(selectCityState, city);
export const selectIsLoading: MemoizedSelector<object, boolean> = createSelector(selectCityState, isLoading);
export const selectError: MemoizedSelector<object, string> = createSelector(selectCityState, error);
