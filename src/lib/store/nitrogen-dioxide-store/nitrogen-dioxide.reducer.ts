import { Action, ActionReducer, createReducer, on } from "@ngrx/store";

import { loadCitySuccessAction } from "../city-store/city.actions";
import { loadNitrogenDioxideRequestAction, loadNitrogenDioxideSuccessAction, loadNitrogenDioxideErrorAction, setAccuracy, setDateTime } from "./nitrogen-dioxide.actions";
import { initialState, NitrogenDioxideState } from "./nitrogen-dioxide.state";

const reducer: ActionReducer<NitrogenDioxideState, Action> = createReducer(
    initialState,
    on(loadCitySuccessAction, (state) => ({
        ...state,
        isLoading: true
    })),
    on(loadNitrogenDioxideRequestAction, (state) => ({
        ...state,
        isLoading: true
    })),
    on(loadNitrogenDioxideSuccessAction, (state, { nitrogenDioxide }) => ({
        ...state,
        nitrogenDioxide: nitrogenDioxide,
        isLoading: false,
        error: undefined
    })),
    on(loadNitrogenDioxideErrorAction, (state, { error }) => ({
        ...state,
        nitrogenDioxide: undefined,
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

export function nitrogenDioxideReducer(state: NitrogenDioxideState | undefined, action: Action): NitrogenDioxideState {
    return reducer(state, action);
}
