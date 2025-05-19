import {configureStore} from "@reduxjs/toolkit";
import UserSlice from "../slice/UserSlice.ts";
export const store = configureStore({
    reducer: {
        users : UserSlice,

    },
});
export type AppDispatch = typeof store.dispatch;