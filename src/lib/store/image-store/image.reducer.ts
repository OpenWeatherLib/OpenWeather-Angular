import { Action, ActionReducer, createReducer, on } from "@ngrx/store";

import { loadCitySuccessAction } from "../city-store/city.actions";
import { loadImageUrlSuccessAction, loadImageUrlErrorAction } from "./image.actions";
import { initialState, ImageState } from "./image.state";

const reducer: ActionReducer<ImageState, Action> = createReducer(
    initialState,
    on(loadCitySuccessAction, (state) => ({
        ...state,
        isLoading: true
    })),
    on(loadImageUrlSuccessAction, (state, { url }) => ({
        ...state,
        url: url,
        isLoading: false,
        error: undefined
    })),
    on(loadImageUrlErrorAction, (state, { error }) => ({
        ...state,
        url: undefined,
        isLoading: false,
        error
    }))
);

export function imageReducer(state: ImageState | undefined, action: Action): ImageState {
    return reducer(state, action);
}
