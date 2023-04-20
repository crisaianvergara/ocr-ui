import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    receiptsLoading: false,
    receiptsSuccess: false,
    receiptsFailed: false,
    receiptsData: []
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
        resetData: (state) => {
            state.receiptsLoading = false;
            state.receiptsSuccess = false;
            state.receiptsFailed = false;
            state.receiptsData = [];
        }
    }
});

export const {
    getReceiptsData, getReceiptsDataFulfilled, getReceiptsDataFailed,
    resetData
} = receiptSlice.actions;

export default receiptSlice.reducer;