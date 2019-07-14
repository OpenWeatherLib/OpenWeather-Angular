import { Ozone } from "@lib/models";

export interface OzoneState {
    ozone?: Ozone;
    dateTime: string;
    accuracy: number;
    isLoading?: boolean;
    error?: any;
}

export const initialState: OzoneState = {
    ozone: undefined,
    dateTime: "2019-07-12",
    accuracy: 2,
    isLoading: false,
    error: undefined
};
