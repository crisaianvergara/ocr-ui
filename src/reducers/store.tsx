import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import userReducer from './userSlice';
import receiptSlice from './receiptSlice';

const makeStore = () => configureStore({
    reducer: {
        user: userReducer,
        receipt: receiptSlice,
    },
    devTools: true
});

export const wrapper = createWrapper(makeStore);