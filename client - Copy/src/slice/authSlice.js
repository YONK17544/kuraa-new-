import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    jwt: "",
    isHere: false,
}

const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        login: (state, data) => {
            state.isLoggedIn = true;
            state.jwt = data.payload.jwt;
            state.isHere = true;
        },
    }
})

export default authSlice.reducer;

export const { login } = authSlice.actions;