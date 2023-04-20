import * as httpRequest from '@/utils/axios';

import {
    getUsersData, getUsersDataFulfilled, getUsersDataFailed,
    resetData
} from "@/reducers/userSlice";

export const getUsers = () => {
    return async (dispatch: any) => {
        dispatch(getUsersData());
        try {
            const response = await httpRequest.get(`user/list/`);
            dispatch(getUsersDataFulfilled(response.data));
        } catch (error) {
            dispatch(getUsersDataFailed());
        };
    };
};

export const resetOn = () => {
    return async (dispatch: any) => {
        dispatch(resetData());
    };
};