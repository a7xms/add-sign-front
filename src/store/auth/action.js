import {createAsyncThunk} from "@reduxjs/toolkit";
import requester from "../../common/requester";


export const startAuthentication = createAsyncThunk(
    'auth/start',
    async (thunkAPI) => {
        try {
            const response = await requester.post("/authentication/start");
            return response.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    });


export const register = createAsyncThunk(
    'auth/register',
    async ({...data}, thunkAPI) => {
        try {
            const response = await requester.post("/register", data);
            return response.data;
        }
        catch (error) {
            thunkAPI.rejectWithValue(error);
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async ({navigate, ...data}, thunkAPI) => {
        try {
            const response = await requester.post("/login", data);
            localStorage.setItem('token', response.data.accessToken);
            return response.data;
        }
        catch (error) {
            thunkAPI.rejectWithValue(error);
        }
    }
)

export const getUserInfo = createAsyncThunk(
    'user/info',
    async (thunkAPI) => {
        try {
            const response = await requester.get("/user/info");
            localStorage.setItem('user', JSON.stringify(response.data));
            return response.data;
        }
        catch (error) {
            thunkAPI.rejectWithValue(error);
        }
    }
)