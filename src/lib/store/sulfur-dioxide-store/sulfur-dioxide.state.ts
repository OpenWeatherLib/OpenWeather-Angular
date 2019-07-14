import { SulfurDioxide } from "@lib/models";

export interface SulfurDioxideState {
    sulfurDioxide?: SulfurDioxide;
    dateTime: string;
    accuracy: number;
    isLoading?: boolean;
    error?: any;
}

export const initialState: SulfurDioxideState = {
    sulfurDioxide: undefined,
    dateTime: "2019-07-12",
    accuracy: 2,
    isLoading: false,
    error: undefined
};
