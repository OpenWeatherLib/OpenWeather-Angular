import { NitrogenDioxide } from "@lib/models";

export interface NitrogenDioxideState {
    nitrogenDioxide?: NitrogenDioxide;
    dateTime: string;
    accuracy: number;
    isLoading?: boolean;
    error?: any;
}

export const initialState: NitrogenDioxideState = {
    nitrogenDioxide: undefined,
    dateTime: "2019-07-12",
    accuracy: 2,
    isLoading: false,
    error: undefined
};
