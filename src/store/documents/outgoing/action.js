import {createAsyncThunk} from "@reduxjs/toolkit";
import requester from "../../../common/requester";

export const getOutgoingDocuments = createAsyncThunk(
    'documents/outgoing',
    async (thunkAPI) => {
        try {
            const response = await requester.get("/documents");
            return response.data;
        }
        catch (e) {
            thunkAPI.rejectWithValue(e);
        }
    }
);

export const uploadFile = createAsyncThunk(
    'documents/upload',
    async ({formData}, thunkAPI) => {
        try {
            const response = await requester.post("/attachment/upload", formData, "multipart/form-data");
            return response.data;
        }
        catch (e) {
            thunkAPI.rejectWithValue(e);
        }
    }
)

export const createDocument = createAsyncThunk(
    'documents/create',
    async ({data}, thunkAPI) => {
        try {
            const response = await requester.post("/documents", data);
            return response.data;
        }
        catch (e) {
            thunkAPI.rejectWithValue(e);
        }
    }
)

