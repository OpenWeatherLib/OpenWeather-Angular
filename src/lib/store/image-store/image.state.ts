export interface ImageState {
    url?: string;
    isLoading?: boolean;
    error?: any;
}

export const initialState: ImageState = {
    url: undefined,
    isLoading: false,
    error: undefined
};
