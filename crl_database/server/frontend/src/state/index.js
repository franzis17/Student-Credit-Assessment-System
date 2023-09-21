import{ createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light" // change this to start in dark mode
};

//this function allows you to change from dark to light theme
export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? "light" : 'light'; //change middle to dark for button to work properly
        }
    }
})

export const {setMode} = globalSlice.actions;

export default globalSlice.reducer;
