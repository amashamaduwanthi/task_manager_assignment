import {configureStore} from "@reduxjs/toolkit";
import UserSlice from "../slice/UserSlice.ts";
import TaskSlice from "../slice/TaskSlice.ts";
export const store = configureStore({
    reducer: {
        users : UserSlice,
        tasks : TaskSlice,
    },
});
export type AppDispatch = typeof store.dispatch;