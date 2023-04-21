import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    receiptsLoading: false,
    receiptsSuccess: false,
    receiptsFailed: false,
    receiptsData: [],

    postReceiptsLoading: false,
    postReceiptsSuccess: false,
    postReceiptsFailed: false,
    postReceiptsData: []
};

export const receiptSlice = createSlice({
    name: 'receipt',
    initialState,
    reducers: {
        getReceiptsData: (state) => {
            state.receiptsLoading = true;
            state.receiptsSuccess = false;
            state.receiptsFailed = false;
        },
        getReceiptsDataFulfilled: (state, action) => {
            state.receiptsLoading = false;
            state.receiptsSuccess = true;
            state.receiptsData = action.payload;
        },
        getReceiptsDataFailed: (state) => {
            state.receiptsLoading = false;
            state.receiptsSuccess = false;
            state.receiptsFailed = false;
        },

        postReceiptsData: (state) => {
            state.postReceiptsLoading = true;
            state.postReceiptsSuccess = false;
            state.postReceiptsFailed = false;
        },
        postReceiptsDataFulfilled: (state, action) => {
            state.postReceiptsLoading = false;
            state.postReceiptsSuccess = true;
            state.postReceiptsData = action.payload;
        },
        postReceiptsDataFailed: (state) => {
            state.postReceiptsLoading = false;
            state.postReceiptsSuccess = false;
            state.postReceiptsFailed = true;
        },

        resetData: (state) => {
            state.receiptsLoading = false;
            state.receiptsSuccess = false;
            state.receiptsFailed = false;
            state.receiptsData = [];

            state.postReceiptsLoading = false;
            state.postReceiptsSuccess = false;
            state.postReceiptsFailed = false;
            state.postReceiptsData = [];
        }
    }
});

export const {
    getReceiptsData, getReceiptsDataFulfilled, getReceiptsDataFailed,
    postReceiptsData, postReceiptsDataFulfilled, postReceiptsDataFailed,
    resetData
} = receiptSlice.actions;

export default receiptSlice.reducer;