import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    receiptsLoading: false,
    receiptsSuccess: false,
    receiptsFailed: false,
    receiptsData: [],

    postReceiptLoading: false,
    postReceiptSuccess: false,
    postReceiptFailed: false,
    postReceiptData: [],

    delReceiptLoading: false,
    delReceiptSuccess: false,
    delReceiptFailed: false,
    delReceiptData: []
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

        postReceiptData: (state) => {
            state.postReceiptLoading = true;
            state.postReceiptSuccess = false;
            state.postReceiptFailed = false;
        },
        postReceiptDataFulfilled: (state, action) => {
            state.postReceiptLoading = false;
            state.postReceiptSuccess = true;
            state.postReceiptData = action.payload;
        },
        postReceiptDataFailed: (state) => {
            state.postReceiptLoading = false;
            state.postReceiptSuccess = false;
            state.postReceiptFailed = true;
        },

        delReceiptData: (state) => {
            state.delReceiptLoading = true
            state.delReceiptSuccess = false
            state.delReceiptFailed = false
        },
        delReceiptDataFulfilled: (state, action) => {
            state.delReceiptLoading = false
            state.delReceiptSuccess = true
            state.delReceiptData = action.payload
        },
        delReceiptDataFailed: (state) => {
            state.delReceiptLoading = false
            state.delReceiptSuccess = false
            state.delReceiptFailed = true
        },

        resetData: (state) => {
            state.receiptsLoading = false;
            state.receiptsSuccess = false;
            state.receiptsFailed = false;
            state.receiptsData = [];

            state.postReceiptLoading = false;
            state.postReceiptSuccess = false;
            state.postReceiptFailed = false;
            state.postReceiptData = [];

            state.delReceiptLoading = false;
            state.delReceiptSuccess = false;
            state.delReceiptFailed = false;
            state.delReceiptData = [];
        }
    }
});

export const {
    getReceiptsData, getReceiptsDataFulfilled, getReceiptsDataFailed,
    postReceiptData, postReceiptDataFulfilled, postReceiptDataFailed,
    delReceiptData, delReceiptDataFulfilled, delReceiptDataFailed,
    resetData
} = receiptSlice.actions;

export default receiptSlice.reducer;