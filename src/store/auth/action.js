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
    async ({...data}, thunkAPI) => {
        try {
            const response = await requester.post("/login", data);
            return response.data;
        }
        catch (error) {
            thunkAPI.rejectWithValue(error);
        }
    }
)