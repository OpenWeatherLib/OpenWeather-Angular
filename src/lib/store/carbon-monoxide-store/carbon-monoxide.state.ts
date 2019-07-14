import { CarbonMonoxide } from "@lib/models";

export interface CarbonMonoxideState {
    carbonMonoxide?: CarbonMonoxide;
    dateTime: string;
    accuracy: number;
    isLoading?: boolean;
    error?: any;
}

export const initialState: CarbonMonoxideState = {
    carbonMonoxide: undefined,
    dateTime: "2019-07-12",
    accuracy: 2,
    isLoading: false,
    error: undefined
};
