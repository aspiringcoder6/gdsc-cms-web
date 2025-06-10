import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pageType: "home",
};

const pageSlice = createSlice({
    name: "page",
    initialState,
    reducers: {
        setPageType: (state, action) => {
            state.pageType = action.payload;
        },
    },
});

export const { setPageType } = pageSlice.actions;

export default pageSlice.reducer;
