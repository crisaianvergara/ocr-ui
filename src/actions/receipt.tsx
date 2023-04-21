import * as httpRequest from '@/utils/axios';

import {
    getReceiptsData, getReceiptsDataFulfilled, getReceiptsDataFailed,
    postReceiptData, postReceiptDataFulfilled, postReceiptDataFailed,
    delReceiptData, delReceiptDataFulfilled, delReceiptDataFailed,
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

export const postReceipt = (data: object) => {
    return async (dispatch: any) => {
        dispatch(postReceiptData());
        try {
            const response = await httpRequest.post(`receipts/`, data);
            dispatch(postReceiptDataFulfilled(response.data));
        } catch (error) {
            dispatch(postReceiptDataFailed());
        }
    };
};

export const delReceipt = (id: number) => {
    return async (dispatch: any) => {
        dispatch(delReceiptData())
        try {
            const response = await httpRequest.destroy(`receipts/${id}/`)
            dispatch(delReceiptDataFulfilled(response.data))
        } catch (error) {
            dispatch(delReceiptDataFailed())
        }
    }
}

export const resetOn = () => {
    return async (dispatch: any) => {
        dispatch(resetData());
    };
};