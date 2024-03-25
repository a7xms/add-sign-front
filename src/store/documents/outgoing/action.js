import {createAsyncThunk} from "@reduxjs/toolkit";
import requester, {BASE_URL} from "../../../common/requester";
import axios from "axios";

axios.defaults.responseType = "json";
axios.defaults.timeout = 30000;

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

export const signDocument = createAsyncThunk(
    'documents/sign',
    async ({data}, thunkAPI) => {
        try {
            const response = await requester.post("/documents/sign", data);
            return response.data;
        }
        catch (e) {
            thunkAPI.rejectWithValue(e);
        }
    }
)

export const shareDocument = createAsyncThunk(
    'documents/share',
    async ({id}, thunkAPI) => {
        try {
            const response = await requester.post("/documents/link/share?id=" + id,  null);
            return response.data;
        }
        catch (e) {
            thunkAPI.rejectWithValue(e);
        }
    }
)


export const getSharedDocument = createAsyncThunk(
    'documents/getShared',
    async ({id}, thunkAPI) => {
        try {
            const response = await requester.get("/shared/link/" + id.link);
            return response.data;
        }
        catch (e) {
            thunkAPI.rejectWithValue(e);
        }
    }
)

export const signSharedDocument = createAsyncThunk(
    'documents/signShared',
    async ({data}, thunkAPI) => {
        try {
            const response = await requester.post("/shared/sign", data);
            return response.data;
        }
        catch (e) {
            thunkAPI.rejectWithValue(e);
        }
    }
)


