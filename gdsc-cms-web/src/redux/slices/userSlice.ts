// userSlice.js

import { createSlice } from "@reduxjs/toolkit";
import IUser from "model/user";

const initialState: IUser = {
    isLoggedIn: false,
    info: { uid: "", photoURL: "", email: "", role: "", displayName: "" },
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.isLoggedIn = true;
            state.info = action.payload;
        },
        logoutUser: (state) => {
            state.isLoggedIn = false;
            state.info = {
                uid: "",
                photoURL: "",
                email: "",
                role: "",
                displayName: "",
            };
        },
    },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
