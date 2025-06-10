import { configureStore } from "@reduxjs/toolkit";

import userReducer from "redux/slices/userSlice";
import pageReducer from "redux/slices/pageSlice";
import documentReducer from "redux/slices/documentSlice";
import taskReducer from "redux/slices/taskSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        page: pageReducer,
        documentation: documentReducer,
        task: taskReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
