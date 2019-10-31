import { Action, ActionReducer, createReducer, on } from "@ngrx/store";

import { loadCitySuccessAction } from "../city-store/city.actions";
import { loadUvIndexRequestAction, loadUvIndexSuccessAction, loadUvIndexErrorAction } from "./uv-index.actions";
import { initialState, UvIndexState } from "./uv-index.state";

const reducer: ActionReducer<UvIndexState, Action> = createReducer(
    initialState,
    on(loadCitySuccessAction, (state) => ({
        ...state,
        isLoading: true
    })),
    on(loadUvIndexRequestAction, (state) => ({
        ...state,
        isLoading: true
    })),
    on(loadUvIndexSuccessAction, (state, { uvIndex }) => ({
        ...state,
        uvIndex: uvIndex,
        isLoading: false,
        error: undefined
    })),
    on(loadUvIndexErrorAction, (state, { error }) => ({
        ...state,
        uvIndex: undefined,
        isLoading: false,
        error: error
    }))
);

export function uvIndexReducer(state: UvIndexState | undefined, action: Action): UvIndexState {
    return reducer(state, action);
}
