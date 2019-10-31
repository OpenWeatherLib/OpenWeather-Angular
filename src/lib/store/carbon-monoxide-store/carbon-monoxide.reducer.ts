import { Action, ActionReducer, createReducer, on } from "@ngrx/store";

import { loadCitySuccessAction } from "../city-store/city.actions";
import { loadCarbonMonoxideRequestAction, loadCarbonMonoxideSuccessAction, loadCarbonMonoxideErrorAction, setAccuracy, setDateTime } from "./carbon-monoxide.actions";
import { initialState, CarbonMonoxideState } from "./carbon-monoxide.state";

const reducer: ActionReducer<CarbonMonoxideState, Action> = createReducer(
    initialState,
    on(loadCitySuccessAction, (state) => ({
        ...state,
        isLoading: true
    })),
    on(loadCarbonMonoxideRequestAction, (state) => ({
        ...state,
        isLoading: true
    })),
    on(loadCarbonMonoxideSuccessAction, (state, { carbonMonoxide }) => ({
        ...state,
        carbonMonoxide: carbonMonoxide,
        isLoading: false,
        error: undefined
    })),
    on(loadCarbonMonoxideErrorAction, (state, { error }) => ({
        ...state,
        carbonMonoxide: undefined,
        isLoading: false,
        error
    })),
    on(setAccuracy, (state, { accuracy }) => ({
        ...state,
        accuracy
    })),
    on(setDateTime, (state, { dateTime }) => ({
        ...state,
        dateTime
    }))
);

export function carbonMonoxideReducer(state: CarbonMonoxideState | undefined, action: Action): CarbonMonoxideState {
    return reducer(state, action);
}
