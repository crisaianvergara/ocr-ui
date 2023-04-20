import * as httpRequest from '@/utils/axios';

import {
    getReceiptsData, getReceiptsDataFulfilled, getReceiptsDataFailed,
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

export const resetOn = () => {
    return async (dispatch: any) => {
        dispatch(resetData());
    };
};