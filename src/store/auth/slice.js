import {createSlice} from "@reduxjs/toolkit";
import {register, startAuthentication} from "./action";


export const authSlice = createSlice({
    name: 'authSlice',
    initialState: {error: '', isLoading: false, data: {}, userData: {}},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(startAuthentication.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(startAuthentication.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(startAuthentication.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.userData = action.payload;
        });
    }
})