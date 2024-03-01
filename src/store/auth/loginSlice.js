import {getUserInfo, login} from "./action";
import {createSlice} from "@reduxjs/toolkit";

const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

export const loginSlice = createSlice({
    name: 'login',
    initialState: {error: '', isLoad: false, token: token || null, user: user || {}},
    reducers: {
        signOut: (state) => {
            state.token = null
            state.user= null
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoad = false;
            state.error = '';
            state.token = action.payload.accessToken
        });
        builder.addCase(login.rejected, (state, action) => {
            state.isLoad = false;
            state.error = action.payload.response.data.message;
        });
        builder.addCase(login.pending, (state) => {
            state.isLoad = true;
        });
        builder.addCase(getUserInfo.fulfilled, (state, action) => {
            state.user = action.payload
        })
    }
});

export const {signOut} = loginSlice.actions