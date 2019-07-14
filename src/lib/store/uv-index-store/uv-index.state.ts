import { UvIndex } from "@lib/models";

export interface UvIndexState {
    uvIndex?: UvIndex;
    isLoading?: boolean;
    error?: any;
}

export const initialState: UvIndexState = {
    uvIndex: undefined,
    isLoading: false,
    error: undefined
};
