import * as httpRequest from '@/utils/axios';

import {
    getReceiptsData, getReceiptsDataFulfilled, getReceiptsDataFailed,
    postReceiptsData, postReceiptsDataFulfilled, postReceiptsDataFailed,
    resetData
} from '@/reducers/receiptSlice';

export const getReceipts = () => {
    return async (dispatch: any) => {
        dispatch(getReceiptsData());
        try {
            const response = await httpRequest.get(`receipts/`);
            dispatch(getReceiptsDataFulfilled(response.data));
        } catch (error) {
            dispatch(getReceiptsDataFailed());
        };
    };
};

export const postReceipts = (data: object) => {
    return async (dispatch: any) => {
        dispatch(postReceiptsData());
        try {
            const response = await httpRequest.post(`receipts/`, data);
            dispatch(postReceiptsDataFulfilled(response.data));
        } catch (error) {
            dispatch(postReceiptsDataFailed());
        }
    };
};

export const resetOn = () => {
    return async (dispatch: any) => {
        dispatch(resetData());
    };
};