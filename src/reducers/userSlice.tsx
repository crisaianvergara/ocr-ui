import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    usersLoading: false,
    usersSuccess: false,
    usersFailed: false,
    usersData: []
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUsersData: (state) => {
            state.usersLoading = true;
            state.usersSuccess = false;
            state.usersFailed = false;
        },
        getUsersDataFulfilled: (state, action) => {
            state.usersLoading = false;
            state.usersSuccess = true;
            state.usersData = action.payload;
        },
        getUsersDataFailed: (state) => {
            state.usersLoading = false;
            state.usersSuccess = false;
            state.usersFailed = false;
        },
        resetData: (state) => {
            state.usersLoading = false;
            state.usersSuccess = false;
            state.usersFailed = false;
            state.usersData = [];
        }
    }
});

export const {
    getUsersData, getUsersDataFulfilled, getUsersDataFailed,
    resetData
} = userSlice.actions;

export default userSlice.reducer;