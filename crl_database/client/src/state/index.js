import{ createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "dark"
};

//this function allows you to change from dark to light theme
export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? "dark" : 'light';
        }
    }
})

export const {setMode} = globalSlice.actions;

export default globalSlice.reducer;
