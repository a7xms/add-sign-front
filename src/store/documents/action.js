import {createAsyncThunk} from "@reduxjs/toolkit";
import requester from "../../common/requester";

export const getDocument = createAsyncThunk(
    'document/view',
    async ({id}, thunkAPI) => {
        try {
            const response = await requester.get("/documents/"+id);
            return response.data;
        }
        catch (e) {
            thunkAPI.rejectWithValue(e);
        }
    }
)