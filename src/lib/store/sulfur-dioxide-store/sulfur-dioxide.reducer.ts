import { Action, ActionReducer, createReducer, on } from "@ngrx/store";

import { loadCitySuccessAction } from "../city-store/city.actions";
import { loadSulfurDioxideRequestAction, loadSulfurDioxideSuccessAction, loadSulfurDioxideErrorAction, setAccuracy, setDateTime } from "./sulfur-dioxide.actions";
import { initialState, SulfurDioxideState } from "./sulfur-dioxide.state";

const reducer: ActionReducer<SulfurDioxideState, Action> = createReducer(
    initialState,
    on(loadCitySuccessAction, (state) => ({
        ...state,
        isLoading: true
    })),
    on(loadSulfurDioxideRequestAction, (state) => ({
        ...state,
        isLoading: true
    })),
    on(loadSulfurDioxideSuccessAction, (state, { sulfurDioxide }) => ({
        ...state,
        sulfurDioxide: sulfurDioxide,
        isLoading: false,
        error: undefined
    })),
    on(loadSulfurDioxideErrorAction, (state, { error }) => ({
        ...state,
        sulfurDioxide: undefined,
        isLoading: false,
        error: error
    })),
    on(setAccuracy, (state, { accuracy }) => ({
        ...state,
        accuracy: accuracy
    })),
    on(setDateTime, (state, { dateTime }) => ({
        ...state,
        dateTime: dateTime
    }))
);

export function sulfurDioxideReducer(state: SulfurDioxideState | undefined, action: Action): SulfurDioxideState {
    return reducer(state, action);
}
