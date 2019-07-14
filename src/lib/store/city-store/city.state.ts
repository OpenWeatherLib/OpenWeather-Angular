import { City } from "@lib/models";

export interface CityState {
    city?: City;
    isLoading?: boolean;
    error?: any;
}

export const initialState: CityState = {
    city: undefined,
    isLoading: false,
    error: undefined
};
