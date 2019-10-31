import { Action, ActionReducer, createReducer, on } from "@ngrx/store";

import { loadCitySuccessAction } from "../city-store/city.actions";
import { loadOzoneRequestAction, loadOzoneSuccessAction, loadOzoneErrorAction, setAccuracy, setDateTime } from "./ozone.actions";
import { initialState, OzoneState } from "./ozone.state";

const reducer: ActionReducer<OzoneState, Action> = createReducer(
    initialState,
    on(loadCitySuccessAction, (state) => ({
        ...state,
        isLoading: true
    })),
    on(loadOzoneRequestAction, (state) => ({
        ...state,
        isLoading: true
    })),
    on(loadOzoneSuccessAction, (state, { ozone }) => ({
        ...state,
        ozone: ozone,
        isLoading: false,
        error: undefined
    })),
    on(loadOzoneErrorAction, (state, { error }) => ({
        ...state,
        ozone: undefined,
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

export function ozoneReducer(state: OzoneState | undefined, action: Action): OzoneState {
    return reducer(state, action);
}
